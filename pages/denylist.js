import React, { useState, useCallback, useEffect } from "react";
import { Page, Card, Select } from "@shopify/polaris";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("../components/Table"));
const TableTotal = dynamic(() => import("../components/TableTotal"));
const Pagination = dynamic(() => import("../components/Pagination"));
const Button = dynamic(()=>import("../components/Button"));
const DateRange = dynamic(()=>import("../components/DateRange"));

const Denylist = ({ authAxios }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  function transformData(data) {
    const result = [];
    for (const row of data) {
      result.push({
        id: row.OrderID,
        customer_name: row.orderInfo.customer_name,
        email: row.orderInfo.email,
        risk_label: row.orderInfo.botInfo.return_risk_label,
        account_status: row.orderInfo.botInfo.account_status,
        bot_status: row.orderInfo.botInfo.bot_status,
        see_more: "...",
      });
    }

    return result;
  }

  const [selectedBlockedIds, setSelectedBlockedIds] = useState([]);
  const [selectedRecommendedIds, setSelectedRecommendedIds] = useState([]);
  const handleBlockedAllow = () => {
    alert("Allow:" + selectedBlockedIds.join(", "));
    setSelectedBlockedIds([]);
  };
  const handleRecommendedAllow = () => {
    alert("Allow:" + selectedRecommendedIds.join(", "));
    setSelectedRecommendedIds([]);
  };
  const handleRecommendedBlock = () => {
    alert("Block:" + selectedRecommendedIds.join(", "));
    setSelectedRecommendedIds([]);
  };
  const [blockedData, setBlockedData] = useState([]);
  const [totalBlocked, setTotalBlocked] = useState(0);
  const [pageBlocked, setPageBlocked] = useState(1);
  const [pageSizeBlocked, setPageSizeBlocked] = useState(15);
  const [totalPagesBlocked, setTotalPagesBlocked] = useState(1);
  const handlePageBlockedChange = (number) => {
    setPageBlocked(number);
  };

  const [recommendedData, setRecommendedData] = useState([]);
  const [totalRecommended, setTotalRecommended] = useState(0);
  const [pageRecommended, setPageRecommended] = useState(1);
  const [pageSizeRecommended, setPageSizeRecommended] = useState(15);
  const [totalPagesRecommended, setTotalPagesRecommended] = useState(1);
  const handlePageRecommendedChange = (number) => {
    setPageBlocked(number);
  };

  const [dateFilterValue, setDateFilterValue] = useState("");
  const handleDateFilterChange = useCallback(
    (value) => setDateFilterValue(value),
    []
  );

  const handleRowBlockedClick = (id) => {
    router.push(`/transaction/${id}`);
  };
  const handleRowRecommendedClick = (id) => {
    router.push(`/transaction/${id}`);
  };

  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    fetch(`${BOTNOT_API_URL}/api/transaction`)
      .then((res) => res.json())
      .then(
        (result) => {
          setTotalBlocked(result.total);
          setPageBlocked(result.page);
          setPageSizeBlocked(result.per_page);
          setTotalPagesBlocked(result.total_pages);

          setTotalRecommended(result.total);
          setPageRecommended(result.page);
          setPageSizeRecommended(result.per_page);
          setTotalPagesRecommended(result.total_pages);

          const data = transformData([
            {
              OrderID: 12345657,
              orderInfo: {
                customer_name: "sally joe",
                email: "xx@mail.com",

                order_status: "Shipped",
                payment: {
                  order_amount: "$111",
                  payment_method: "credit card",
                  card_type: "american express",
                  last_4: "1234",
                  BIN: "1234567",
                  Country: "USA",
                },
                shipping: {
                  shipping_method: "Priority",
                  shipping_rate: "$12.50",
                  name: "sally joe",
                  address: "1234 main street",
                  state: "PA",
                  zip: "123356",
                  country: "US",
                },
                device: {
                  ip_address: "123.123.123.123",
                  billing_distance: "850",
                  country: "US",
                  city: "Atlanta",
                  proxy: 0,
                  ISP: "Century Link",
                  ip_category: "Residential",
                },
                botInfo: {
                  bot_status: "BOT",
                  bot_score: 0.31,
                  return_risk_score: 0.11,
                  return_risk_label: "Low",
                  trust_flags: [],
                  risk_flags: [],
                },
              },
            },
            {
              OrderID: 3253646,
              orderInfo: {
                customer_name: "john doe",
                email: "jdoe@mail.com",

                order_status: "Canceled",
                payment: {
                  order_amount: "$17",
                  payment_method: "credit card",
                  card_type: "american express",
                  last_4: "1234",
                  BIN: "1234567",
                  Country: "USA",
                },
                shipping: {
                  shipping_method: "Priority",
                  shipping_rate: "$12.50",
                  name: "sally joe",
                  address: "1234 main street",
                  state: "PA",
                  zip: "123356",
                  country: "US",
                },
                device: {
                  ip_address: "123.123.123.123",
                  billing_distance: "850",
                  country: "US",
                  city: "Atlanta",
                  proxy: 0,
                  ISP: "Century Link",
                  ip_category: "Residential",
                },
                botInfo: {
                  bot_status: "BOT",
                  bot_score: 0.39,
                  return_risk_score: 0.18,
                  return_risk_label: "High",
                  trust_flags: [],
                  risk_flags: [],
                },
              },
            },
          ]);
          setBlockedData(data);
          setRecommendedData(data);
          setIsLoaded(true);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (!isLoaded) {
    return <b>Loading...</b>;
  } else {
    return (
      <Page>
        <div className="inner">
          <section class="title">
            <h1 class="visually-hidden">Denylist</h1>
          </section>
          <section className="blocked-accounts">
            <div className="title">
              <h2>Blocked Accounts</h2>
              <nav className="b-choise">
                <DateRange
                  selectedDates={dateRange}
                  setSelectedDates={setDateRange}
                />
              </nav>
            </div>

            <div className="search-management">
              <div className="download dropdownWrapper">
                <button
                  className="dropdownLabel"
                  onClick={function () {
                    const el = document.getElementById("dropdownPanel");
                    el.style.display === "none"
                      ? (el.style.display = "initial")
                      : (el.style.display = "none");
                  }}
                >
                  <svg
                    width="19"
                    height="13"
                    viewBox="0 0 19 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.71436 7.71436H15.7144V5.71436H3.71436V7.71436ZM0.714355 0.714355V2.71436H18.7144V0.714355H0.714355ZM7.71436 12.7144H11.7144V10.7144H7.71436V12.7144Z"
                      fill="#3E4345"
                    ></path>
                  </svg>
                </button>
                <div className="dropdownPanel" id="dropdownPanel">
                  <ul>
                    <li>
                      <a href="#">CSV</a>
                    </li>
                    <li>
                      <a href="#">Exel</a>
                    </li>
                    <li>
                      <a href="#">PDF</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right">
                <div className="lite-button">
                  {" "}
                  <Button label="Allow" onClick={handleBlockedAllow} />{" "}
                </div>
              </div>
            </div>

            <div className="Polaris-Card__whithout-style">
              <Card>
                <div className="outer-table standart blocked">
                  <Table
                    columns={[
                      { title: "Order", key: "id" },
                      { title: "Customer Name", key: "customer_name" },
                      { title: "Email", key: "email" },
                      { title: "Risk", key: "risk_label" },
                      { title: "Account Status", key: "order_status" },
                      { title: "Bot Status", key: "bot_status" },
                      { title: "See More", key: "see_more" },
                    ]}
                    data={blockedData}
                    selectedIds={selectedBlockedIds}
                    onRowSelect={setSelectedBlockedIds}
                    onRowClick={handleRowBlockedClick}
                  />
                </div>
                <nav className="pagination">
                  <div className="b-shown">
                    <TableTotal
                      total={totalBlocked}
                      pageSize={pageSizeBlocked}
                      page={pageBlocked}
                    />
                  </div>
                  <Pagination
                    page={pageBlocked}
                    totalPages={totalPagesBlocked}
                    onPageChange={handlePageBlockedChange}
                  />
                </nav>
              </Card>
            </div>
          </section>
          <section className="blocked-accounts">
            <div className="title">
              <h2>Recommended Accounts to Block</h2>
              <nav className="b-choise">
                <DateRange
                  selectedDates={dateRange}
                  setSelectedDates={setDateRange}
                />
              </nav>
            </div>

            <div className="search-management">
              <div className="download dropdownWrapper">
                <button
                  className="dropdownLabel"
                  onClick={function () {
                    const el = document.getElementById("dropdownPanel");
                    el.style.display === "none"
                      ? (el.style.display = "initial")
                      : (el.style.display = "none");
                  }}
                >
                  <svg
                    width="19"
                    height="13"
                    viewBox="0 0 19 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.71436 7.71436H15.7144V5.71436H3.71436V7.71436ZM0.714355 0.714355V2.71436H18.7144V0.714355H0.714355ZM7.71436 12.7144H11.7144V10.7144H7.71436V12.7144Z"
                      fill="#3E4345"
                    ></path>
                  </svg>
                </button>
                <div className="dropdownPanel" id="dropdownPanel">
                  <ul>
                    <li>
                      <a href="#">CSV</a>
                    </li>
                    <li>
                      <a href="#">Exel</a>
                    </li>
                    <li>
                      <a href="#">PDF</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right">
                <div className="lite-button">
                  {" "}
                  <Button label="Allow" onClick={handleRecommendedAllow} />{" "}
                </div>
                <div className="lite-button">
                  {" "}
                  <Button label="Block" onClick={handleRecommendedBlock} />{" "}
                </div>
              </div>
            </div>
            <div className="Polaris-Card__whithout-style">
              <Card>
                <div className="outer-table standart blocked">
                  <Table
                    columns={[
                      { title: "Order", key: "id" },
                      { title: "Customer Name", key: "customer_name" },
                      { title: "Email", key: "email" },
                      { title: "Risk", key: "risk_label" },
                      { title: "Account Status", key: "order_status" },
                      { title: "Bot Status", key: "bot_status" },
                      { title: "See More", key: "see_more" },
                    ]}
                    data={recommendedData}
                    selectedIds={selectedRecommendedIds}
                    onRowSelect={setSelectedRecommendedIds}
                    onRowClick={handleRowRecommendedClick}
                  />
                </div>
                <nav className="pagination">
                  <div className="b-shown">
                    <TableTotal
                      total={totalRecommended}
                      pageSize={pageSizeRecommended}
                      page={pageRecommended}
                    />
                  </div>
                  <Pagination
                    page={pageRecommended}
                    totalPages={totalPagesRecommended}
                    onPageChange={handlePageRecommendedChange}
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

export default Denylist;
