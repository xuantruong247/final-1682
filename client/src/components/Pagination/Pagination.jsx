import React, { memo } from "react";
import usePagination from "../../hooks/usePagination";
import { PagiItem } from "..";

const Pagination = ({ totalCount }) => {
  const pagination = usePagination(totalCount, 2);

  return (
    <div className="flex gap-2">
      {pagination?.map((item, index) => (
        <PagiItem key={index}>{item}</PagiItem>
      ))}
    </div>
  );
};

export default memo(Pagination);
