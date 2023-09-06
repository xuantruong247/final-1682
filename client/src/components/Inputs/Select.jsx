import clsx from "clsx";
import React, { memo } from "react";

const Select = ({
  label,
  options = [],
  register,
  errors,
  id,
  validate,
  style,
  fullWidth,
}) => {
  return (
    <div className={clsx("flex flex-col justify-center h-[20px] gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...register(id, validate)}
        className={clsx(
          "form-select outline-none p-2 placeholder:p-1",
          fullWidth && "w-full"
        )}
      >
        <option value="">---CHOOSE---</option>
        {options?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
