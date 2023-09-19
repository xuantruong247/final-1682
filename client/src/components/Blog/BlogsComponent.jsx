import React, { memo } from "react";


const BlogsComponent = () => {

  return (
    <div className="w-full">
      <h3 className="font-semibold text-[20px] py-[15px] border-b-2 border-main">
        BlogsComponent
      </h3>
    </div>
  );
};

export default memo(BlogsComponent);
