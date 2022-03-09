import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const BillingToast = (props) => {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <ToastContainer className="billing_toast">
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Body>Thanks, we will remind you next time</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default BillingToast;
