import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function PieChart(props) {
  const { google, title, width, height, data } = props;
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (google && !chart) {
      const googleData = new google.visualization.DataTable();
      googleData.addColumn("string", "Topping");
      googleData.addColumn("number", "Slices");
      googleData.addRows(data);
      let options = {
        title: title,
        width: width,
        height: height,
        lineStyle: { "font-size": "5px" },
        colors: ["#EA3D2F", "#2FA84F"],
        backgroundColor: "#F1F3F4",
        cornerRadius: 20,
        titleTextStyle: {
          color: "#222",
          fontName: "var(--maven)",
          fontSize: 16,
        },
      };

      const newChart = new google.visualization.PieChart(
        document.getElementById(title)
      );
      newChart.draw(googleData, options);
      setChart(newChart);
    }
  }, [google, chart, width, data]);

  return (
    <>
      {!google && <Spinner />}
      <div id={title} />
    </>
  );
}

export default PieChart;
