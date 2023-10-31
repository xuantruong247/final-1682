import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import { formatMoney } from "../../utils/helpers";
import { apiUpdateWishlist } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../redux/user/asyncAction";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteWishlist = async (pid) => {
    const response = await apiUpdateWishlist(pid);
    if (response) {
      toast.success("Delete product success.");
      dispatch(getCurrent());
    }
  };
  return (
    <div>
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Wishlist</span>
      </h1>
      <div className="p-4 w-full grid grid-cols-4 gap-4">
        {current?.wishlist?.map((el) => (
          <div className="bg-white p-2">
            <img
              src={el.avatar}
              alt=""
              className="w-[274px] h-[250px] object-cover m-auto"
            />
            <div className="flex flex-col mt-[15px] items-start gap-1 w-full pb-4">
              <span className="line-clamp-1">{el?.title}</span>
              <span>{`${formatMoney(el?.price)} VND`}</span>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                style={
                  "px-4 py-2 rounded-md text-white bg-main hover:bg-black text-semibold w-full"
                }
              >
                Add to cart
              </Button>
              <Button
                style={
                  "px-4 py-2 rounded-md text-white bg-black hover:bg-main text-semibold w-full"
                }
                handlerOnclick={() => {
                  deleteWishlist(el._id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
