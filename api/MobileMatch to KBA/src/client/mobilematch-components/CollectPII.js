import React from 'react'

const CollectPII = ({submit}) => {
  return (
    <>
      <h1>2. Personal Information</h1><br/>
      <input required id="firstName" placeholder="(First Name)"></input><br/>
        <input required id="lastName" placeholder="(Last Name)"></input><br/>
        <input required id="phoneNumber" placeholder="(Phone Number) e.g. 8887771234"></input><br/>
        <input required id="streetNumber" placeholder="(Street Number)"></input><br/>
        <input required id="street" placeholder="(Street)"></input><br/>
        <input required id="city" placeholder="(City)"></input><br/>
        <input required id="state" placeholder="(State) e.g. VA"></input><br/>
        <input required id="zip" placeholder="(ZIP Code)"></input><br/>
        <button type="submit" onClick={submit}>submit</button>
      </>
  );
};

export default CollectPII;
