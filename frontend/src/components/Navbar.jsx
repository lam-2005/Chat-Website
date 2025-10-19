import React from "react";
import ProfileHeader from "./ProfileHeader";
import useAuthStore from "../store/useAuthStore";
import { LogOut } from "lucide-react";
import ActiveTabSwitch from "./ActiveTabSwitch";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <div className="border-gray-300 border-r rounded-l-2xl p-4 flex flex-col justify-between items-center bg-white">
      <div className="flex flex-col gap-5 items-center">
        <ProfileHeader />
        <div>
          <ActiveTabSwitch />
        </div>
      </div>
      <div className="tooltip tooltip-left" data-tip="Logout">
        <button
          className="cursor-pointer hover:text-error transition-colors flex items-center justify-center p-2 mb-2
            "
          onClick={logout}
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
