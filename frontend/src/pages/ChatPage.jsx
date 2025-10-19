// import useAuthStore from "../store/useAuthStore";

import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactsList from "../components/ContactsList";
import Navbar from "../components/Navbar";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import useChatStore from "../store/useChatStore";

const ChatPage = () => {
  // const { logout } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div
      className="bg-card w-[95vw] max-[426px]:w-screen max-[426px]:h-screen max-w-6xl  h-[95%] md:h-[90vh] md:max-h-[95vh]  absolute top-1/2 left-1/2 -translate-1/2 max-[426px]:rounded-none
    shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-2xl flex "
    >
      <Navbar />
      <div
        className={`max-[426px]:rounded-none! md:max-w-80 w-full max-md:rounded-r-2xl max-md:w-fit max-lg:w-65  flex-col border-r border-gray-300 bg-white ${
          selectedUser ? "max-md:hidden rounded-r-none!" : "flex flex-1 "
        }`}
      >
        <h1 className="text-xl font-bold px-4 pt-4">
          {activeTab === "chats" ? "Chats" : "Contacts"}
        </h1>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 ">
          {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
        </div>
      </div>

      <div
        className={`h-full flex-1 flex-col bg-white backdrop-blur-sm rounded-r-2xl max-[426px]:rounded-none ${
          selectedUser ? "flex" : "max-md:hidden"
        }`}
      >
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
};

export default ChatPage;
