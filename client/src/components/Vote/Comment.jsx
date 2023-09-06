import React, { memo } from "react";
import avatarUser from "../../assets/image/avatar.png";
import moment from "moment";
import { renderStarFromNumber } from "../../utils/helpers";

const Comment = ({
  image = avatarUser,
  name = "Anonymous",
  updatedAt,
  comment,
  star,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <img
          src={image}
          alt="avatar"
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto text-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs italic">{moment(updatedAt)?.fromNow()}</span>
        </div>
        <div className="flex flex-col gap-2 pl-4  border border-gray-200 py-2 bg-gray-100 rounded-md">
          <span className="flex gap-1  items-center">
            <span className="font-semibold">Vote:</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </span>
          </span>
          <span className="flex gap-1">
            <span className="font-semibold">Comment:</span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
