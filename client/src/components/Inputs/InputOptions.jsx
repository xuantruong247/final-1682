import React, { memo } from "react";

const InputOptions = ({ value, changeValue, Options }) => {
  return (
    <select
      className="p-2 border border-gray-900 "
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      {Options?.map((item, index) => (
        <option value={item.value} key={index}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputOptions);
