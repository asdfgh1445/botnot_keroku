import React from "react";
import GaugeChart from "./GaugeChart";
import Link from "next/link";
import { Alert, Col, Row } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";

const WarningMessage = (props) => {
  const { tier_details, service_status } = props.serviceStatus;
  const { setWarning } = props;
  return (
    <>
      <Alert
        variant={
          service_status.over_quota
            ? service_status.suspended
              ? "danger"
              : "warning"
            : "success"
        }
        onClose={() => setWarning(false)}
        dismissible
      >
        <Row className="WarningMSG">
          <Col md={4} style={{ alignContent: "center" }}>
            <GaugeChart
              service_status={service_status}
              tier_details={tier_details}
            />
            <p className="gaugeTitle">
              <span>{0}</span>
              <span>
                {tier_details.transactions_maximum +
                  tier_details.transactions_maximum * 0.2}
              </span>
            </p>
            <p className="fz-15">Billing Cycle</p>
          </Col>
          <Col md={8} className="mt-20">
            <p className="MessageTitle">Plan Usage:</p>
            <ul>
              <li className="list">
                <BsCheckCircleFill
                  style={{
                    color: service_status.over_quota
                      ? service_status.suspended
                        ? "red"
                        : "yellowgreen"
                      : "green",
                    marginRight: "10px",
                  }}
                />
                {service_status.over_quota
                  ? service_status.suspended
                    ? "You have 0 transactions left"
                    : "You have exceed the overage amount"
                  : "You have 40k transactions left"}
              </li>
              <li className="list">
                <BsCheckCircleFill
                  style={{
                    color: service_status.over_quota
                      ? service_status.suspended
                        ? "red"
                        : "yellowgreen"
                      : "green",
                    marginRight: "10px",
                  }}
                />
                {service_status.over_quota
                  ? service_status.suspended
                    ? "BotNot is not providing Analytics/Protection"
                    : "The service will expire at an overage of 50 transcations"
                  : "You’ve at 10K less transctions this month"}
              </li>
              <li className="list">
                <BsCheckCircleFill
                  style={{
                    color: service_status.over_quota
                      ? service_status.suspended
                        ? "red"
                        : "yellowgreen"
                      : "green",
                    marginRight: "10px",
                  }}
                />
                {service_status.over_quota || service_status.suspended ? (
                  <Link href="/upgrade">
                    <a>
                      {" "}
                      <b>Upgrade here</b>
                    </a>
                  </Link>
                ) : (
                  "You will be billed $2,000 in 20 days"
                )}
              </li>
            </ul>
          </Col>
        </Row>
      </Alert>
    </>
  );
};

export default WarningMessage;
