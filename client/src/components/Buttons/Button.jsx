import React, { memo } from "react";

const Button = ({  handlerOnclick, style, children }) => {
  return (
    <div>
      <button
        type="submit"
        className={
          style
            ? style
            : "px-4 py-2 rounded-md text-white bg-main text-semibold w-full"
        }
        onClick={() => {
          handlerOnclick && handlerOnclick();
        }}
      >
        {children}
        </button>
    </div>
  );
};

export default memo(Button);
