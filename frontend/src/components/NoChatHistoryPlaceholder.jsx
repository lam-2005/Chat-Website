import { MessageCircle } from "lucide-react";

const NoChatHistoryPlaceholder = () => {
  return (
    <div className="flex flex-col items-center gap-3 h-full justify-center p-5">
      <div className="text-pink-600 bg-pink-500/20 p-3 rounded-full flex items-center justify-center">
        <MessageCircle size={32} />
      </div>
      <div className="flex flex-col items-center">
        <h4 className="font-bold text-lg">No messages yet</h4>
        <p className="text-center text-sm ">
          Start a conversation to see your messages here
        </p>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
