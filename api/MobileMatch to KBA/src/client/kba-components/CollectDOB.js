import React from 'react'

const CollectDOB = ({submit}) => {
  return (
    <>
      <h1>3. Date Of Birth</h1><br/>
        <input required id="dateOfBirth" placeholder="(DOB): xx/xx/xxxx"></input><br/>
        <button type="submit" onClick={submit}>submit</button>
      </>
  );
};

export default CollectDOB;
