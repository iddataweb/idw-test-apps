import React from 'react'

const CaptureLink = ({ submit }) => {
  return (
    <>
      <h1>3. Personal Info</h1><br/>
      <input id="firstName" placeholder="(First Name)"></input>
      <input id="lastName" placeholder="(Last Name)"></input>
      <input id="phoneNumber" placeholder="(Phone Number): 1234567890"></input>
      <button onClick={submit}>Click to Send Document Capture Link</button>
    </>
  );
};

export default CaptureLink;