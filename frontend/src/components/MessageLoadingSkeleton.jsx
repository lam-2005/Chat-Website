const MessageLoadingSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto space-x-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`chat ${
            i % 2 === 0 ? "chat-start" : "chat-end"
          } animate-pulse m-0`}
        >
          <div className={`chat-bubble w-32 bg-black/10 text-white`}></div>
        </div>
      ))}
    </div>
  );
};

export default MessageLoadingSkeleton;
