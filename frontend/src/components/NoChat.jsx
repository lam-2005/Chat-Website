import { MessageCircle } from "lucide-react";
import React from "react";
import useChatStore from "../store/useChatStore";

const NoChat = () => {
  const { setActiveTab } = useChatStore();
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-pink-600 bg-pink-500/20 p-3 rounded-full flex items-center justify-center">
        <MessageCircle />
      </div>
      <div className="flex flex-col items-center">
        <h4 className="font-bold text-lg">No conversations yet</h4>
        <p className="text-center text-sm w-[70%]">
          Start a new chat by selecting a contact from the contact tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-3 py-2 hover:bg-pink-500 hover:text-white cursor-pointer transition-colors text-pink-600  bg-pink-500/20 rounded-lg "
      >
        Find contacts
      </button>
    </div>
  );
};

export default NoChat;
