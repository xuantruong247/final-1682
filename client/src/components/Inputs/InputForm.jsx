import React, { memo } from "react";
import clsx from "clsx";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
}) => {
  return (
    <div className={clsx("flex flex-col justify-center h-[20px] gap-2", style)}>
      {label && (
        <label className="mt-10 font-medium" htmlFor={id}>
          {label + ":"}
        </label>
      )}
      <input
        type={type}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "form-input outline-none p-2 placeholder:p-1",
          fullWidth && "w-full"
        )}
        defaultValuex={defaultValue}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
