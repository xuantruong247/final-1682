import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { getCurrent } from "../../redux/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";

const TopHeader = () => {
  const dispatch = useDispatch();

  const { isLogindIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLogindIn) {
      dispatch(getCurrent());
    }
  }, [dispatch, isLogindIn]);

  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex justify-between items-center text-sm text-white msm:justify-center">
        <span className="msm:hidden inline">
          ORDER ONLINE OR CALL US (0856) 93 2222
        </span>
        {isLogindIn ? (
          <small className="flex justify-center gap-2 items-center">
            <span className="text-xs font-semibold">
              {`Welcome, ${current?.lastname} ${current?.firstname}`}
            </span>
          </small>
        ) : (
          <Link to={`/${path.LOGIN}`} className="hover:text-black">
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
