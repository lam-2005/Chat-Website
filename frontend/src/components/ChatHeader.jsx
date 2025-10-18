import React from "react";
import useChatStore from "../store/useChatStore";
import { XIcon } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);
  return (
    <div className="flex justify-between items-center bg-white border-b border-gray-300 max-h-[84px] px-5 flex-1 rounded-tr-2xl">
      <div className="flex items-canter gap-3">
        <div
          className={`avatar ${
            onlineUsers.includes(selectedUser._id)
              ? "avatar-online"
              : "avatar-offline"
          }`}
        >
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.userName}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-medium">{selectedUser.userName}</h3>
          <p className="text-sm text-black/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Close the conversation">
        <button
          className="hover:text-error p-1 cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
