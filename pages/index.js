import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Page, Card } from "@shopify/polaris";
import PieChart from "../components/PieChart";
import GoogleCharts from "../components/GoogleCharts";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DateRange = dynamic(() => import("../components/DateRange"));
const TableDashboard = dynamic(() => import("../components/TableDashboard"));
const TableTotal = dynamic(() => import("../components/TableTotal"));
const Pagination = dynamic(() => import("../components/Pagination"));
const WarningMessage = dynamic(() => import("../components/WarningMessage"));
const BillingToast = dynamic(() => import("../components/BillingToast"));

const Index = ({ authAxios, host }) => {
  const google = GoogleCharts();
  const [isLoaded, setIsLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [totalsData, setTotalsData] = useState({});
  const [warning, setWarning] = useState(true);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [serviceStatus, setServiceStatus] = useState([]);

  const handlePageChange = (number) => {
    setPage(number);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [dateRange, setDateRange] = useState({
    start: yesterday,
    end: new Date(),
  });
  function transformData(data) {
    const result = [];
    for (const row of data) {
      result.push({
        phrase: row.phrase,
        bot_status: row.bot_status,
        fraudalent: row.fraudalent,
        returns: row.returns,
        discount_abuse: row.discount_abuse,
        sold: row.sold,
      });
    }
    return result;
  }

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };

  const loadData = () => {
    authAxios
      .get(
        `/api/dashboard?page=${page}&page_size=${pageSize}&date_from=${formatDate(
          dateRange.start
        )}&date_to=${formatDate(dateRange.end)}`
      )
      .then((result) => {
        if (result.data.totals) {
          setChartData([
            result.data.totals.fraudalent,
            result.data.totals.safe,
          ]);
          setTotal(result.data.totals.product_count);
          setPage(page);
          setPageSize(pageSize);
          setTotalPages(
            Math.ceil(result.data.totals.product_count / pageSize / 1)
          );
          setTableData(transformData(result.data.data));
          setTotalsData(result.data.totals);
          setServiceStatus(result.data.service_status);
          setIsLoaded(true);
        } else {
          setMessage("Unexpected error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        console.log(error);
      });
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("date_filter_from") &&
        localStorage.getItem("date_filter_to")
      ) {
        setDateRange({
          start: new Date(localStorage.getItem("date_filter_from")),
          end: new Date(localStorage.getItem("date_filter_to")),
        });
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    setTableData([]);
    if (ready) {
      loadData();
    }
  }, [ready, dateRange, page, pageSize]);

  if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary spinner-5" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <Page>
        <div className="inner">
          <section className="title">
            <h1>Welcome!</h1>
            <nav className="b-choise">
              <DateRange
                selectedDates={dateRange}
                setSelectedDates={setDateRange}
              />
            </nav>
          </section>

          <section className="total-orders">
            <div className="columns">
              <div className="col">
                <header>
                  <h2 className="title">Total Orders</h2>
                  <div className="lite-button">
                    <Link href="/transactions">See More</Link>
                  </div>
                </header>
                <div className="order-list">
                  <article className="order-item">
                    <Card>
                      <h4 className="title">Total Revenue</h4>
                      <div className="inform">
                        {totalsData.revenue && totalsData.revenue.toFixed(2)}
                      </div>
                      {/* <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip
                            id="button-tooltip-2"
                            style={{ fontSize: "14px" }}
                          >
                            Total Revenue
                          </Tooltip>
                        }
                      >
                        {({ ref, ...triggerHandler }) => (
                          <a
                            ref={ref}
                            variant="light"
                            {...triggerHandler}
                            className="d-inline-flex align-items-center faq"
                          >
                            <svg
                              width="14"
                              height="15"
                              viewBox="0 0 14 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6.3 11.326H7.7V9.92598H6.3V11.326ZM7 0.125977C6.08075 0.125977 5.17049 0.307037 4.32122 0.65882C3.47194 1.0106 2.70026 1.52622 2.05025 2.17623C0.737498 3.48898 0 5.26946 0 7.12598C0 8.98249 0.737498 10.763 2.05025 12.0757C2.70026 12.7257 3.47194 13.2414 4.32122 13.5931C5.17049 13.9449 6.08075 14.126 7 14.126C8.85651 14.126 10.637 13.3885 11.9497 12.0757C13.2625 10.763 14 8.98249 14 7.12598C14 6.20672 13.8189 5.29647 13.4672 4.44719C13.1154 3.59791 12.5998 2.82624 11.9497 2.17623C11.2997 1.52622 10.5281 1.0106 9.67878 0.65882C8.8295 0.307037 7.91925 0.125977 7 0.125977ZM7 12.726C3.913 12.726 1.4 10.213 1.4 7.12598C1.4 4.03898 3.913 1.52598 7 1.52598C10.087 1.52598 12.6 4.03898 12.6 7.12598C12.6 10.213 10.087 12.726 7 12.726ZM7 2.92598C6.25739 2.92598 5.5452 3.22098 5.0201 3.74608C4.495 4.27118 4.2 4.98337 4.2 5.72598H5.6C5.6 5.35467 5.7475 4.99858 6.01005 4.73603C6.2726 4.47348 6.6287 4.32598 7 4.32598C7.3713 4.32598 7.7274 4.47348 7.98995 4.73603C8.2525 4.99858 8.4 5.35467 8.4 5.72598C8.4 7.12598 6.3 6.95098 6.3 9.22598H7.7C7.7 7.65098 9.8 7.47598 9.8 5.72598C9.8 4.98337 9.505 4.27118 8.9799 3.74608C8.4548 3.22098 7.74261 2.92598 7 2.92598Z"></path>
                            </svg>
                          </a>
                        )}
                      </OverlayTrigger> */}
                    </Card>
                  </article>
                  <article className="order-item">
                    <Card>
                      <h4 className="title">Total Transactions</h4>
                      <div className="inform">{totalsData.transactions}</div>
                    </Card>
                  </article>
                  <article className="order-item m-green">
                    <Card>
                      <h4 className="title">Safe Transactions</h4>
                      <div className="inform">
                        {totalsData.safe ? totalsData.safe.toFixed(2) : 0}%
                      </div>
                    </Card>
                  </article>
                  <article className="order-item m-red">
                    <Card>
                      <h4 className="title">Suspicious Transactions</h4>
                      <div className="inform">
                        {totalsData.fraudalent
                          ? totalsData.fraudalent.toFixed(2)
                          : 0}
                        %
                      </div>
                    </Card>
                  </article>
                </div>
              </div>
              <div className="col">
                <div className="order-list">
                  <article className="order-item total-order">
                    {chartData.length > 1 && (
                      <PieChart
                        google={google}
                        width={350}
                        height={200}
                        title={"Total Orders"}
                        data={[
                          ["Suspicious transcations", chartData[0]],
                          ["Safe transcations", chartData[1]],
                        ]}
                      />
                    )}
                  </article>
                </div>
              </div>
            </div>
          </section>
          <section className="top-botted">
            <header>
              <h2 className="title">Top Botted</h2>
            </header>
            <article className="top-table">
              <div className="outer-table standart transaction">
                <TableDashboard
                  columns={[
                    { title: "Phrase", key: "phrase" },
                    { title: "Bot, %", key: "bot_status" },
                    { title: "Fraudalent, %", key: "fraudalent" },
                    { title: "Returns, %", key: "returns" },
                    { title: "Discount Abuse, %", key: "discount_abuse" },
                    { title: "Inventory Sold", key: "sold" },
                  ]}
                  data={tableData}
                />
              </div>
              <nav className="pagination">
                <div className="b-shown">
                  <TableTotal total={total} pageSize={pageSize} page={page} />
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </nav>
            </article>
          </section>
          <section className="top-botted">
            <header>
              <h2 className="title">Billing Status</h2>
            </header>
            {/* {warning && (
              <WarningMessage
                setWarning={setWarning}
                serviceStatus={serviceStatus}
              />
            )} */}
          </section>
          <BillingToast warning={!warning} />
        </div>
      </Page>
    );
  }
};

export default Index;
