import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { LoaderIcon, LogOut } from "lucide-react";
const ProfileHeader = () => {
  const { authUser, logout, isUpdatingProfile, updateProfile } = useAuthStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = React.useRef(null);
  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="p-5 border-b border-gray-300 max-h-[84px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar ">
            <button
              className="size-13 rounded-full overflow-hidden relative group border-1 border-gray-400 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Your avatar"
                className="size-full object-cover"
              />
              {isUpdatingProfile ? (
                <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/30 size-full items-center justify-center flex">
                  <span className="text-xs text-white animate-spin">
                    <LoaderIcon />
                  </span>
                </div>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/30 size-full items-center justify-center opacity-0 group-hover:opacity-100 flex">
                  <span className="text-xs text-white">Change</span>
                </div>
              )}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUploadFile}
              className="hidden"
            />
          </div>
          <div className="w-40 line-clamp-1" title="Phan Phúc Lâm">
            <span>Phan Phúc Lâm</span>
          </div>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Logout">
          <button
            className="cursor-pointer hover:text-error transition-colors flex items-center justify-center p-1
            "
            onClick={logout}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
