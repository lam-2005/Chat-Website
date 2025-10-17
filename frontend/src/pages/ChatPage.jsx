// import useAuthStore from "../store/useAuthStore";

import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactsList from "../components/ContactsList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import useChatStore from "../store/useChatStore";

const ChatPage = () => {
  // const { logout } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div
      className="bg-card w-full max-w-6xl h-[800px] absolute top-1/2 left-1/2 -translate-1/2
    shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-2xl flex max-h-[95%]"
    >
      <div className="w-80 flex flex-col border-r border-gray-300 bg-white rounded-l-2xl">
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-white backdrop-blur-sm rounded-r-2xl">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
};

export default ChatPage;
