const Tooltip = ({ message, children, position = "top" }) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div
        className={`${
          position === "top" ? "bottom-0" : "top-8"
        } absolute flex-col items-center hidden mb-6 group-hover:flex`}
      >
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
          {message}
        </span>
        <div
          className={`${
            position === "top" ? "-mt-2" : "-mt-11"
          } w-3 h-3 rotate-45 bg-gray-600`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
