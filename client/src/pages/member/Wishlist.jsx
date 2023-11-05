import React from "react";
import { useSelector } from "react-redux";
import { ItemWishlist } from "../../components";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Wishlist</span>
      </h1>
      <div className="p-4 w-full grid grid-cols-4 gap-4">
        {current?.wishlist?.map((el) => (
          <ItemWishlist productData={el} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
