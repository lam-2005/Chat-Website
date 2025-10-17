import React from "react";
import useChatStore from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div role="tablist" className="tabs tabs-box bg-transparent p-2 flex m-2">
      <button
        className={`tab flex-1 flex items-center justify-center transition-colors duration-200 rounded-lg ${
          activeTab === "chats"
            ? "bg-pink-500/20 text-pink-600"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("chats")}
      >
        Chats
      </button>
      <button
        className={`tab flex-1 flex items-center justify-center transition-colors duration-200 rounded-lg ${
          activeTab === "contacts"
            ? "bg-pink-500/20 text-pink-600"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
