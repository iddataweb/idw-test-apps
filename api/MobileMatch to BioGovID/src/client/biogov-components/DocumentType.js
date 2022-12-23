import React from 'react'

const DocumentType = ({ submit }) => {
  return (
    <>
      <h1>2. Document Type</h1>
      <select id="document-type">
        <option value="license">Driver's License</option>
        <option value="idcard">ID Card</option>
        <option value="passport">Passport</option>
      </select>
      <button className="button" onClick={submit}>Submit</button>
      <br></br>
    </>
  );
};

export default DocumentType;