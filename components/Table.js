import React, { useState, useCallback } from "react";
import { Checkbox } from "@shopify/polaris";

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
        {data.map((row, rowIndex) => (
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
                <span className={`label ${row[col.key]}`}>{row[col.key]}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
