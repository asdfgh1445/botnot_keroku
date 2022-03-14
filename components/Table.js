import React, { useState, useCallback } from "react";
import { Checkbox } from "@shopify/polaris";
import { BsBookmarkXFill } from "react-icons/bs";

const Table = ({ columns, data, onRowSelect, selectedIds, onRowClick }) => {
  const handleSelectAllChange = useCallback((checked) => {
    const ids = checked ? data.map((item) => item.id) : [];
    onRowSelect(ids);
  }, []);
  const handleSelectRowChange = useCallback(
    (checked, id) => {
      const ids = selectedIds.includes(id)
        ? selectedIds.filter((value) => value != id)
        : [...selectedIds, id];
      onRowSelect(ids);
    },
    [selectedIds]
  );

  return (
    <table className="standart">
      <thead>
        <tr>
          <th className="check-all">
            <Checkbox
              checked={selectedIds.length === data.length}
              onChange={handleSelectAllChange}
            />
          </th>
          {columns.map((col, index) => (
            <th key={`head-${index}`}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className={`row-${rowIndex}`}>
              <td className="checkbox">
                <Checkbox
                  checked={selectedIds.includes(row.id)}
                  onChange={(checked) => handleSelectRowChange(checked, row.id)}
                />
              </td>
              {columns.map((col, colIndex) => (
                <td
                  className={`cell-${colIndex}  ${col.key}`}
                  key={`cell-${rowIndex}-${colIndex}`}
                  onClick={(e) => onRowClick(row.id)}
                >
                  <span className={`label ${row[col.key]}`}>
                    {row[col.key]}
                  </span>
                  {colIndex == 0 && row.orders_is_marked_as_fraud && (
                    <BsBookmarkXFill color="red" />
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="100%">
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

export default Table;
