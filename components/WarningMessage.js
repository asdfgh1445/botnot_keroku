import React from "react";
import GaugeChart from "./GaugeChart";
import {Icon} from '@shopify/polaris';
import {
    Alert,
    Col,
    Row
} from "react-bootstrap";
import {
    CircleTickMajor    
} from "@shopify/polaris-icons";

const WarningMessage = (props) => {
    const { tier_details, service_status } = props.serviceStatus;
    const { setWarning } = props;
    return(
        <>            
            <Alert variant="danger"  onClose={() => setWarning(false)}  dismissible>
                <Row className="WarningMSG">
                    <Col md={4} style={{ alignContent:"center"}}>
                        <GaugeChart
                            service_status={service_status}
                            tier_details={tier_details}
                        />
                        <p className="gaugeTitle">
                            <span>{0}</span>
                            <span>{tier_details.transactions_maximum + tier_details.transactions_maximum*0.2}</span>
                        </p>
                        <p className="fz-15">Billing Cycle</p>
                    </Col>
                    <Col md={8} className="mt-20"> 
                        <p className="MessageTitle">Plan Usage:</p>
                        <ul>
                            <li className="list">
                                <Icon source={CircleTickMajor} color="critical" backdrop width="10px"/>
                                { 
                                    service_status.over_quota? service_status.suspended ?
                                    "You have 0 transactions left":
                                    "You have exceed the overage amount":""
                                }   
                            </li>
                            <li className="list">
                                <Icon source={CircleTickMajor} color="critical" backdrop />
                                { 
                                    service_status.over_quota ? service_status.suspended 
                                    ? "BotNot is not providing Analytics/Protection" : 
                                    "The service will expire at an overage of 50 transcations" : ""
                                }
                            </li>
                            <li className="list">
                                <Icon source={CircleTickMajor} color="critical" backdrop />
                                <a href="https://app.clickup.com" target="_blank">
                                    <b>Upgrade here</b>
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>              
            </Alert>
        </>
    )
}

export default WarningMessage;