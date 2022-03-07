import React, { useState, useCallback } from "react";

const TableDashboard = ({ columns, data }) => {
  return (
    <table className="standart">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={`head-${index}`}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  className={`cell-${colIndex}  ${col.key}`}
                  key={`cell-${rowIndex}-${colIndex}`}
                >
                  <span className={`label ${row[col.key]}`}>
                    {row[col.key]}
                  </span>
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colspan="100%">
              <div className="d-flex justify-content-center">
                <div
                  className="spinner-border text-secondary spinner-3"
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableDashboard;
