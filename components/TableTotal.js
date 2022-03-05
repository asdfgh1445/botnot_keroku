import React, { useState, useCallback } from "react";

const TableTotal = ({ total, page, pageSize }) => {
  const startIndex = total > 0 ? (page - 1) * pageSize + 1 : 0;
  let endIndex = startIndex + pageSize - 1;
  if (endIndex > total) {
    endIndex = total;
  }

  return (
    <div className="table-total">
      Showing{" "}
      <span>
        {startIndex}-{endIndex}
      </span>{" "}
      of {total}
    </div>
  );
};

export default TableTotal;
