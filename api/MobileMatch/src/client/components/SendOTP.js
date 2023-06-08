import React from "react";

const SendOTP = ({submit}) => {
  return (
    <>
    <h1>3. Request a One-time Password</h1><br/>
      <button onClick={submit}>submit</button>
    </>
  );
};

export default SendOTP;
