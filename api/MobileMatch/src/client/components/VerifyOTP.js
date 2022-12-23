import React from 'react'

const VerifyOTP = ({ submit }) => {
  return (
    <>
    <h1>4. Verify OTP</h1><br/>
    <input onChange={() => {}} id="pinCode" placeholder="..."></input>
    <button onClick={submit}>submit</button>
    </>
  );
};

export default VerifyOTP;