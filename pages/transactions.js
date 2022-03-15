import React, { useState, useCallback, useEffect } from "react";
import { Page, Card, Select } from "@shopify/polaris";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("../components/Table"));
const TableTotal = dynamic(() => import("../components/TableTotal"));
const Pagination = dynamic(() => import("../components/Pagination"));
const Button = dynamic(() => import("../components/Button"));
const DateRange = dynamic(() => import("../components/DateRange"));
const ExportTool = dynamic(() => import("../components/ExportTool"));

const Transactions = ({ authAxios }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("Loading...");
  function transformData(data) {
    const result = [];
    for (const row of data) {
      result.push({
        id: row.order_id,
        customer_name:
          row.customer_fullname != " " ? row.customer_fullname : "xxx xxx",
        email:
          row.customer_email != true ? row.customer_email : "xxx@example.com",
        risk_label: row.order_risk,
        order_status: row.order_status,
        bot_status: row.bot_status,
        discount_abuse: row.discount_abuse,
        orders_is_marked_as_fraud: row.orders_is_marked_as_fraud,
        see_more: "...",
      });
    }

    return result;
  }

  const [type, setType] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const handleAllow = () => {
    authAxios
      .post(`/api/transaction/${selectedIds.join(",")}/approve`)
      .then((result) => {
        if (result.data.success) {
          setSelectedIds([]);
          loadTransactions();
        }
      })
      .catch((error) => console.log(error));
  };
  const handleFraud = () => {
    authAxios
      .post(`/api/transaction/${selectedIds.join(",")}/mark_as_fraud`)
      .then((result) => {
        if (result.data.success) {
          setSelectedIds([]);
          loadTransactions();
        }
      })
      .catch((error) => console.log(error));
  };
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (number) => {
    setPage(number);
  };

  const [dateFilterValue, setDateFilterValue] = useState("");
  const handleDateFilterChange = useCallback(
    (value) => setDateFilterValue(value),
    []
  );

  const handleRowClick = (id) => {
    router.push(`/transaction?id=${id}`);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [dateRange, setDateRange] = useState({
    start: yesterday,
    end: new Date(),
  });

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
  };
  const loadTransactions = () => {
    authAxios
      .get(
        `/api/transactions?page=${page}&page_size=${pageSize}&date_from=${formatDate(
          dateRange.start
        )}&date_to=${formatDate(dateRange.end)}`
      )
      .then((result) => {
        if (result.data.data) {
          setTotal(result.data.totals.order_count);
          setPage(page);
          setPageSize(pageSize);
          setTotalPages(
            Math.ceil(result.data.totals.order_count / pageSize / 1)
          );
          setTableData(transformData(result.data.data));
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
      loadTransactions();
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
        {" "}
        <div className="inner">
          <section className="title">
            <h1>Transactions</h1>
            <nav className="b-choise">
              <DateRange
                selectedDates={dateRange}
                setSelectedDates={setDateRange}
              />
            </nav>
          </section>
          <section className="transactions">
            <div className="Polaris-Card__whithout-style">
              <Card>
                <div className="search-management">
                  <div className="right">
                    <div className="lite-button">
                      <Button label="Mark as Safe" onClick={handleAllow} />
                    </div>
                    <div className="lite-button">
                      <Button label="Mark as Fraud" onClick={handleFraud} />
                    </div>
                  </div>
                </div>
                <div className="outer-table standart transaction">
                  <Table
                    columns={[
                      { title: "Order", key: "id" },
                      { title: "Customer Name", key: "customer_name" },
                      { title: "Email", key: "email" },
                      { title: "Risk", key: "risk_label" },
                      { title: "Order Status", key: "order_status" },
                      { title: "Bot Status", key: "bot_status" },
                      { title: "Discount Abuse", key: "discount_abuse" },
                      { title: "See More", key: "see_more" },
                    ]}
                    data={tableData}
                    selectedIds={selectedIds}
                    onRowSelect={setSelectedIds}
                    onRowClick={handleRowClick}
                  />
                </div>
                <nav className="pagination">
                  <div className="b-shown">
                    <TableTotal total={total} pageSize={pageSize} page={page} />
                  </div>
                  <ExportTool authAxios={authAxios} />
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </nav>
              </Card>
            </div>
          </section>
        </div>
      </Page>
    );
  }
};

export default Transactions;
