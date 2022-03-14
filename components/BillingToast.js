import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const BillingToast = ({ warning }) => {
  const [toast, setToast] = useState(warning);
  console.log(warning);
  return (
    <ToastContainer className="billing_toast">
      <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
        <Toast.Body>Thanks, we will remind you next time</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default BillingToast;
