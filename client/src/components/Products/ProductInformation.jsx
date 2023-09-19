import React, { memo, useState } from "react";
import { productInfoTabs } from "../../utils/contants";
import { VoteBar, Button, VoteOptions, Comment } from "..";
import { renderStarFromNumber } from "../../utils/helpers";
import { apiRatings } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/category/categorySlide";
import Swal from "sweetalert2";
import path from "../../utils/path";
import { useNavigate } from "react-router-dom";

const ProductInformation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const dispatch = useDispatch();
  const [activeTabs, setActiveTabs] = useState(1);
  const { isLogindIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmitVoteOptione = async ({ comment, score }) => {
    if (!score || !comment || !pid) {
      alert("Missing vote when click submit");
      return;
    }
    await apiRatings({
      star: score,
      comment,
      pid,
      updatedAt: Date.now(),
    });
    rerender();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };

  const handleVoteNow = () => {
    if (!isLogindIn) {
      Swal.fire({
        icon: "error",
        text: "Go login to vote",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Oops...!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOptions
              nameProduct={nameProduct}
              handleSubmitVoteOptione={handleSubmitVoteOptione}
            />
          ),
        })
      );
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col py-8">
          <div className="flex border">
            <div className="flex-4 flex flex-col items-center justify-center">
              <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>

              <span className="flex items-center gap-1">
                {renderStarFromNumber(totalRatings)?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </span>
              <span className="text-sm">{`${ratings?.length} reviewrs and commentors`}</span>
            </div>
            <div className="flex-6 flex flex-col gap-1 p-3">
              {Array.from(Array(5).keys())
                .reverse()
                .map((item, index) => (
                  <VoteBar
                    key={index}
                    number={item + 1}
                    ratingTotal={ratings?.length}
                    ratingsCount={
                      ratings?.filter((el) => el.star === item + 1)?.length
                    }
                  />
                ))}
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center text-sm gap-2">
            <span>Do you review this product?</span>
            <Button
              handlerOnclick={() => {
                handleVoteNow();
              }}
            >
              Vote now!
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {ratings?.map((item, index) => (
              <Comment
                key={index}
                star={item.star}
                updatedAt={item.updatedAt}
                comment={item.comment}
                name={`${item.postedBy?.lastname} ${item.postedBy?.firstname}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInformation);
