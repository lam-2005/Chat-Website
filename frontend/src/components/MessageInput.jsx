import React from "react";
import useChatStore from "../store/useChatStore";
import { toast } from "react-toastify";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { FaHeart } from "react-icons/fa";
const MessageInput = () => {
  const [imagePreview, setImagePreview] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [text, setText] = React.useState("");

  const { sendMessage } = useChatStore();
  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div className="p-4 border-t border-gray-300">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb3 flex items-center mb-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-gray-500"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-white cursor-pointer flex items-center justify-center hover:brightness-80"
              type="button"
            >
              <XIcon size={16} />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSend}
        className="max-w-3xl mx-auto flex space-x-4 justify-between items-center"
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="tooltip tooltip-top" data-tip="Upload image">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-lg size-10 hover:text-pink-600 hover:bg-pink-500/20 flex items-center justify-center ${
              imagePreview ? "text-pink-600 bg-pink-500/20" : ""
            }`}
          >
            <ImageIcon className="size-6" />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto"; // reset để tính lại chiều cao
            e.target.style.height = e.target.scrollHeight + "px"; // đặt theo nội dung
          }}
          className="flex-1 bg-black/10 outline-none rounded-lg py-2 px-4 resize-none max-h-30 overflow-y-auto"
          placeholder="Type your message..."
          rows={1}
        />
        {text || imagePreview ? (
          <div className="tooltip tooltip-top" data-tip="Send">
            <button
              className="hover:bg-pink-500 text-pink-600  flex items-center justify-center rounded-lg hover:text-white size-10"
              type="submit"
            >
              <SendIcon size={20} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              sendMessage({
                icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#FF3366"></path> </g></svg>',
              })
            }
            className="flex items-center justify-center rounded-lg scale-115 cursor-pointer text-xl size-10 text-[#FF3366] hover:animate-jump hover:animate-infinite"
          >
            <FaHeart />
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
