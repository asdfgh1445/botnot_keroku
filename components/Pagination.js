import React, { useState, useCallback } from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const rangeSize = 5;

  return (
    <ul className="pages">
      <li className="pages-item show-first">
        <button disabled={page === 1} onClick={(e) => onPageChange(1)}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.123047 7.87689V0.123047H1.41535V7.87689H0.123047ZM2.38458 3.99997L7.87689 0.123047V7.87689L2.38458 3.99997Z"></path>
          </svg>
        </button>
      </li>
      <li className="pages-item prev">
        <button disabled={page === 1} onClick={(e) => onPageChange(page - 1)}>
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.23071 0.476807V9.52296L0.123022 4.99988L7.23071 0.476807Z"></path>
          </svg>
        </button>
      </li>
      {[...Array(totalPages)].map((x, index) => (
        <li
          key={`page-${index}`}
          className={
            page === index + 1 ? "pages-item page active" : "pages-item page"
          }
          onClick={(e) => onPageChange(index + 1)}
        >
          <button>{index + 1}</button>
        </li>
      ))}
      <li className="pages-item next">
        <button
          disabled={page === totalPages}
          onClick={(e) => onPageChange(page + 1)}
        >
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.769287 9.52319L0.769287 0.47704L7.87698 5.00012L0.769287 9.52319Z"></path>
          </svg>
        </button>
      </li>
      <li className="pages-item show-last">
        <button
          disabled={page === totalPages}
          onClick={(e) => onPageChange(totalPages)}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.58458 7.87689H7.87689V0.123047H6.58458V7.87689ZM0.123047 7.87689L5.61535 3.99997L0.123047 0.123047V7.87689Z"></path>
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
