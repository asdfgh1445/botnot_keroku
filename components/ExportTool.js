import { BsFileEarmarkExcelFill, BsFileEarmarkPdfFill } from "react-icons/bs";

const ExportTool = ({ authAxios }) => {
  const exportXls = () => {
    authAxios
      .get(
        `/api/transactions?date_from="2022-01-01"&date_to="2022-01-31"&export_format="csv"`
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <BsFileEarmarkExcelFill
        className="export-tool"
        onClick={() => exportXls()}
      />
      <BsFileEarmarkPdfFill
        className="export-tool"
        onClick={() => exportXls()}
      />
    </div>
  );
};

export default ExportTool;
