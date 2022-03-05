import React, { useState, useCallback } from "react";
import { DatePicker } from "@shopify/polaris";

import Button from "../components/Button";

const DateRange = ({ selectedDates, setSelectedDates }) => {
  const [{ month, year }, setDate] = useState({
    month: selectedDates.end.getMonth(),
    year: selectedDates.end.getFullYear(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(selectedDates);

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const formatDate = (date) =>
    date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const togglePicker = useCallback(() => setIsOpen((v) => !v), []);

  const apply = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
        localStorage.setItem('date_filter_from', selectedRange.start.toISOString());
        localStorage.setItem('date_filter_to', selectedRange.end.toISOString());
    }
    setSelectedDates(selectedRange);
  }, [selectedRange]);

  return (
    <div className="date-picker" style={{ position: "relative" }}>
      <div
        className="date-range"
        onClick={togglePicker}
        style={{ cursor: "pointer" }}
      >
        {formatDate(selectedDates.start)} - {formatDate(selectedDates.end)}
      </div>

      {isOpen ? (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            top: "35px",
            right: 0,
            padding: "1em",
            border: "1px solid gray",
            zIndex: 31,
          }}
        >
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedRange}
            onMonthChange={handleMonthChange}
            selected={selectedRange}
            disableDatesBefore={new Date("2022-01-01T00:00:00")}
            disableDatesAfter={new Date()}
            allowRange
            multiMonth
          />
          <Button label="Apply" onClick={apply} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DateRange;
