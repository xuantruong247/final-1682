import React, { memo } from "react";
import clsx from "clsx";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
  useLocation,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    console.log(queries);
    if (Number(children)) {
      queries.page = children;
    }
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });

    console.log(queries);
  };

  return (
    <button
      disabled={!Number(children)}
      type="button"
      onClick={handlePagination}
      className={clsx(
        "w-10 h-10 flex justify-center hover:rounded-full  ",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center hover:bg-main hover:text-white",
        +params.get("page") === +children &&
          "rounded-full bg-main underline-none text-white"
      )}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);
