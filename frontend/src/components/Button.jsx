const Button = ({ className, type, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-l from-orange-400  to-pink-400 p-2 text-white rounded-xl hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-black/50 cursor-pointer
        flex items-center justify-center
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
