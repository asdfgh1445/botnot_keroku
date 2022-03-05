import React, { useState } from "react";
import { useRouter } from "next/router";

const TransactionMarkAsFraud = ({ authAxios }) => {
  const router = useRouter();
  const { id } = router.query;
  const [message, setMessage] = useState('Loading...');

  authAxios
      .post(`/api/transaction/${id}/mark_as_fraud`)
      .then((result) => {
          if (result.data.success) {
              router.push(`/transaction?id=${id}`);
          } else {
              setMessage('Unexpected error occurred. Please try again later.');
          }
      })
      .catch((error) => { setMessage(error.message); console.log(error) });

  return <b>{ message }</b>;
};

export default TransactionMarkAsFraud;
