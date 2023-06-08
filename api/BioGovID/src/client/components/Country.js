import React from "react";

const Country = ({ submit }) => {
  return (
    <>
      <h1>1. Country Selection</h1>
      <select id="country">
        <option value="US">United States</option>
        <option value="MX">Mexico</option>
        <option value="AU">Australia</option>
      </select>
      <button className="button" id="login-button" onClick={submit}>submit</button>
      <br></br>
    </>
  );
};

export default Country;
