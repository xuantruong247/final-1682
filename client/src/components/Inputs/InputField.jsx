import React, { memo } from "react";
import clsx from "clsx";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  style,
}) => {
  return (
    <div className="w-full relative mb-2 ">
      {value !== "" && (
        <label
          className={clsx(
            "text-[12px] animate-slide-top-sm absolute top-0 left-[10px] block bg-white px-2",
            style
          )}
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm my-2 border w-full outline-none placeholder:text-sm placeholder:italic"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main text-[10px] italic">
          {invalidFields?.find((el) => el.name === nameKey)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
