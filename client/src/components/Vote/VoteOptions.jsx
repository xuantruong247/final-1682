import React, { memo, useRef, useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { voteOptions } from "../../utils/contants";
import { AiFillStar } from "react-icons/ai";
import { Button } from "..";

const VoteOptions = ({ nameProduct, handleSubmitVoteOptione }) => {
  const modalRef = useRef();
  const [chooseScore, setChooseScore] = useState(null);
  const [comment, setConmment] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex flex-col items-center justify-center gap-4"
    >
      <img src={logo} alt="logo" className="w-[300px] my-8 object-contain" />
      <h2 className="text-center text-medium text-lg">{`Voting product ${nameProduct}`}</h2>
      <textarea
        className="form-textarea w-full h-[100px] border placeholder:italic placeholder:text-xs placeholder:text-gray-500 outline-none"
        placeholder="Type something"
        value={comment}
        onChange={(e) => setConmment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4">
        <p>How do you like this product?</p>
        <div className="flex items-center gap-2 justify-center">
          {voteOptions.map((item, index) => (
            <div
              key={index}
              className="p-4 w-[100px] h-[100px] rounded-sm bg-gray-200  cursor-pointer flex flex-col items-center justify-center gap-2"
              onClick={() => {
                setChooseScore(item.id);
                setScore(item.id);
              }}
            >
              {Number(chooseScore && chooseScore >= item.id) ? (
                <AiFillStar className="text-orange-400" />
              ) : (
                <AiFillStar className="text-gray-700" />
              )}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <Button
          handlerOnclick={() => {
            handleSubmitVoteOptione({ comment, score });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default memo(VoteOptions);
