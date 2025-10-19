import React from "react";
import useChatStore from "../store/useChatStore";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { RiContactsBook3Fill, RiContactsBook3Line } from "react-icons/ri";
const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab, setSelectedUser } = useChatStore();

  return (
    <div
      role="tablist"
      className="tabs tabs-box bg-transparent flex flex-col gap-4"
    >
      <div
        className={`tooltip tooltip-left tab flex-1 flex items-center justify-center transition-colors duration-200 rounded-lg text-[27px] p-3 hover:bg-pink-500 hover:text-white  ${
          activeTab === "chats" ? "bg-pink-500 text-white" : "text-gray-600"
        }`}
        data-tip="Chats"
        onClick={() => {
          setActiveTab("chats");
          setSelectedUser(null);
        }}
      >
        <button>
          {activeTab === "chats" ? <AiFillMessage /> : <AiOutlineMessage />}
        </button>
      </div>
      <div
        className={`tooltip tooltip-left tab flex-1 flex items-center justify-center transition-colors duration-200 rounded-lg text-[27px] p-3  hover:bg-pink-500 hover:text-white  ${
          activeTab === "contacts" ? "bg-pink-500 text-white" : "text-gray-600"
        }`}
        data-tip="Contacts"
        onClick={() => {
          setActiveTab("contacts");
          setSelectedUser(null);
        }}
      >
        <button>
          {activeTab === "contacts" ? (
            <RiContactsBook3Fill />
          ) : (
            <RiContactsBook3Line />
          )}
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
