import React, { useState, useCallback, useEffect } from "react";
import { Page, Card, Select } from "@shopify/polaris";
import { useRouter } from "next/router";

import Button from "../components/Button";
import RiskScale from "../components/RiskScale";

const TransactionDetails = ({ authAxios }) => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [data, setData] = useState({});
  const [shipping, setShipping] = useState({});
  const [items, setItems] = useState([]);

  const loadTransactionData = () => {
    authAxios
      .get(`/api/transaction/${id}`)
      .then((result) => {
        if (result.data.data && result.data.data.length) {
          setData(result.data.data[0]);
          setShipping(
            result.data.data[0].orders_shipping_address
              ? JSON.parse(result.data.data[0].orders_shipping_address)
              : {}
          );
          setItems(
            result.data.data[0].orders_items
              ? JSON.parse(result.data.data[0].orders_items)
              : []
          );
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
    loadTransactionData();
  }, []);

  const handleAllow = () => {
    authAxios
      .post(`/api/transaction/${id}/approve`)
      .then((result) => {
        if (result.data.success) {
          loadTransactionData();
        }
      })
      .catch((error) => console.log(error));
  };
  const handleBlock = () => {
    authAxios
      .post(`/api/transaction/${id}/mark_as_fraud`)
      .then((result) => {
        if (result.data.success) {
          loadTransactionData();
        }
      })
      .catch((error) => console.log(error));
  };

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
            <h1>Transaction {data.order_id}</h1>
            <div className="managment">
              <div className="lite-button">
                <Button label="Mark as Fraud" onClick={handleAllow} />
              </div>
              <div className="lite-button">
                <Button label="Mark as Safe" onClick={handleBlock} />
              </div>
            </div>
          </section>
          <div className="Polaris-Card__whithout-style">
            <Card>
              <section className="transaction-info">
                <table className="inform">
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <th>Transaction Number</th>
                      <th>Order Status</th>
                      <th>Bot Status</th>
                      <th>Return Risk</th>
                    </tr>
                    <tr>
                      <td>
                        <div>{new Date(data.date).toLocaleString()}</div>
                      </td>
                      <td>
                        <div>{data.orders_order_number}</div>
                      </td>
                      <td>
                        <div>{data.order_status}</div>
                      </td>
                      <td>
                        <div>{data.bot_status}</div>
                      </td>
                      <td>
                        <div>{data.order_risk}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="risk-information">
                <div className="title">
                  This transaction passed at{" "}
                  <span className="low underline">{data.order_risk}</span> risk
                  of being a bot.
                </div>
                <RiskScale value={0.75 /* TODO: use actual value */} />
                {/* 
                <article className="risk-description">
                  <div className="low">
                    <div className="title">Trust Indicators</div>
                    <ul>
                      <li>Address Verification Match</li>
                      <li>Virtual Phone Number Verifcation </li>
                      <li>Email Domain Verifcation</li>
                      <li>Card Verification Match</li>
                    </ul>
                  </div>
                  <div className="high">
                    <div className="title">Risk Indicators</div>
                    <ul>
                      <li>Irregular Domain</li>
                      <li>Products not being shipped to specific address</li>
                      <li>
                        Orders PLaced in location distant from billing address
                      </li>
                      <li>Virtual Phone</li>
                      <li>Order Shipped to Warehouse </li>
                    </ul>
                  </div>
                </article> */}
              </section>
            </Card>
          </div>
          <div className="Polaris-Card__whithout-style">
            <Card>
              <section className="transaction-details">
                <article className="detail transaction-detail">
                  <div className="title">Transactions</div>
                  <dl>
                    <dt>Total Amount: </dt>
                    <dd>${Number(data.orders_total_price_usd).toFixed(2)}</dd>
                  </dl>
                </article>
                <article className="detail shipping-detail">
                  <div className="title">Shipping</div>
                  <dl>
                    <dt>Name: </dt>
                    <dd>{shipping.name}</dd>
                    <dt>Address: </dt>
                    <dd>
                      {shipping.address1} {shipping.address2}
                    </dd>
                    <dt>State/Region: </dt>
                    <dd>{shipping.province}</dd>
                    <dt>ZIP: </dt>
                    <dd>{shipping.zip}</dd>
                    <dt>Country: </dt>
                    <dd>{shipping.country}</dd>
                  </dl>
                </article>
                <article className="detail device-detail">
                  <div className="title">Device</div>
                  <dl>
                    <dt>IP Address: </dt>
                    <dd>{data.orders_browser_ip}</dd>
                  </dl>
                </article>
                <article className="detail order-detail">
                  <div className="title">Order Detail</div>
                  <dl>
                    <dt>Product Count: </dt>
                    <dd>{data.product_count}</dd>
                    <dt>Unit Count: </dt>
                    <dd>{items.length}</dd>
                  </dl>
                </article>
              </section>
            </Card>
          </div>
        </div>
      </Page>
    );
  }
};

export default TransactionDetails;
