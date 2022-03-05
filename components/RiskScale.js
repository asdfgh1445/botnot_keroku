import React from "react";

const RiskScale = ({ value }) => {
  return (
    <div className="b-risk-scale">
      <div className="risk-scale">
        <div
          className="progress"
          style={{ width: `${value * 100}%` }}
          title={value}
        ></div>
      </div>
      <div className="division">
        {[...Array(11)].map((x, index) => (
          <div key={`scale-${index}`} className={`scale-${index}`}></div>
        ))}
      </div>
    </div>
  );
};

export default RiskScale;
