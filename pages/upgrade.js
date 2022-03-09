import { Col, Row, Form, Button } from "react-bootstrap";
import UpgradeMenu from "../components/UpgradeMenu";
import { BsCheck } from "react-icons/bs";

const Upgrade = () => {
  return (
    <Row>
      <Col lg={3}>
        <nav className="navigation">
          <UpgradeMenu />
        </nav>
      </Col>
      <Col lg={9}>
        <div className="upgrade-content">
          <p className="title">The Right Plan for Your Business</p>
          <p className="description">
            We’re providing you streamlined & stable Transactions. Enjoy the
            journey of connecting, understanding, and targeting to your true
            consumers.
          </p>
          <div className="swith-button">
            <span>Bill Monthly</span>
            <Form>
              <Form.Check type="switch" id="custom-switch" />
            </Form>
            <span>Bill Annually</span>
          </div>
        </div>
        <div className="cart">
          <Row>
            <Col lg={3}>
              <div className="purchase-card">
                <div>
                  <p className="title">Free</p>
                  <ul className="upgrade-list">
                    <li>
                      <BsCheck className="check-icon" />
                      <p>0-100 transaction mo.</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Bot & Human Flags/Metrics</p>
                    </li>
                  </ul>
                </div>
                <div className="upgrade-bottom">
                  <div className="price-title">
                    <span className="dollar">$</span>
                    <span style={{ fontSize: "30px" }}>
                      <b>0</b>
                    </span>
                    <sub>/month</sub>
                  </div>
                  <button className="price-button">Primary</button>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="purchase-card">
                <div>
                  <p className="title">Base</p>
                  <ul className="upgrade-list">
                    <li>
                      <BsCheck className="check-icon" />
                      <p>101 - 500 transactions mo.</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Bot & Human Flags/Metrics</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Lifetime Value</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Auto-Policies</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Customer Support</p>
                    </li>
                  </ul>
                </div>
                <div className="upgrade-bottom">
                  <div className="price-title">
                    <span className="dollar">$</span>
                    <span style={{ fontSize: "30px" }}>
                      <b>217</b>
                    </span>
                    <sub>/month</sub>
                  </div>
                  <button className="price-button">Choose</button>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="purchase-card">
                <div>
                  <p className="title">Pro</p>
                  <ul className="upgrade-list">
                    <li>
                      <BsCheck className="check-icon" />
                      <p>101 - 1,500 transactions mo.</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Bot & Human Flags/Metrics</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Lifetime Value</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Auto-Policies</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Customer Support</p>
                    </li>
                  </ul>
                </div>
                <div className="upgrade-bottom">
                  <div className="price-title">
                    <span className="dollar">$</span>
                    <span style={{ fontSize: "30px" }}>
                      <b>566</b>
                    </span>
                    <sub>/month</sub>
                  </div>
                  <button className="price-button">Choose</button>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="purchase-card">
                <div>
                  <p className="title">Enterprise</p>
                  <ul className="upgrade-list">
                    <li>
                      <BsCheck className="check-icon" />
                      <p>1,500+ transactions mo.</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Bot & Human Flags/Metrics</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Lifetime Value</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Custom Tooling</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>White Glove Service</p>
                    </li>
                    <li>
                      <BsCheck className="check-icon" />
                      <p>Dedicated Team Support</p>
                    </li>
                  </ul>
                </div>
                <div className="upgrade-bottom">
                  <button className="price-button">Contact Us</button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default Upgrade;
