import React from 'react';
import Country from "./components/Country"
import CollectPII from "./components/CollectPII"
import SendOTP from "./components/SendOTP"
import VerifyOTP from "./components/VerifyOTP"
import Results from "./components/Results"
import Logo from './components/Logo';
import './App.css'

export default class App extends React.Component {
  // MobileMatch (user) Template:
  // ------------------------------------------
  state = {
    asi: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    street: null,
    streetNumber: null,
    city: null,
    state: null,
    country: null,
    zip: null,
    results: null,
    pinCode: null,
    step: 0
  }
  // ------------------------------------------

  componentDidMount = () => fetch('/api/refreshToken')

  next = () => {
    this.setState({ step: this.state.step >= 4 ? 4 : this.state.step + 1})
    this.toggleBufferingWheel.off()
  }

  toggleBufferingWheel = {
    on: () => {
      document.getElementById("loading").style.visibility = "visible"
    },
    off: () => {
      document.getElementById("loading").style.visibility = "hidden"
    }
  }

  fetch = (url) => {
    return fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
  }

  submitCountry = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({ country: document.getElementById("country").value })
    this.fetch("/api/slverify/submitCountry")
      .then(response => response.json())
      .then(async (data) => {
        if (data.message === "something went wrong") {
          alert("error: Country not supported.")
          this.toggleBufferingWheel.off()
          return
        }
          await this.setState({ asi: data.transaction_id })
          this.next()
      })
  }

  submitPII = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({
      firstName: document.getElementById("firstName").value.toLowerCase(),
      lastName: document.getElementById("lastName").value.toLowerCase(),
      phoneNumber: document.getElementById("phoneNumber").value.toLowerCase(),
      street: document.getElementById("street").value.toLowerCase(),
      streetNumber: document.getElementById("streetNumber").value.toLowerCase(),
      city: document.getElementById("city").value.toLowerCase(),
      state: document.getElementById("state").value.toLowerCase(),
      zip: document.getElementById("zip").value.toLowerCase(),
    })

    this.fetch("/api/slverify/submitPII")
    this.next()
  }

  submitOTPRequest = async () => {
    this.toggleBufferingWheel.on()
    await this.fetch("/api/slverify/submitOTPRequest")
    this.next()
  }

  submitOTP = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({ pinCode: document.getElementById("pinCode").value })
    await this.fetch("/api/slverify/submitOTP")
      .then(response => response.json())
      .then(data => this.setState({ results: data }))
    this.next()
  }

  render() {
    switch (this.state.step) {
      case 0:
        return (
          <>
            <Logo />
            <Country submit={this.submitCountry} />
          </>
        )
      case 1:
        return (
          <>
            <Logo />
            <CollectPII submit={this.submitPII} />
          </>
        )
      case 2:
        return (
          <>
            <Logo />
            <SendOTP submit={this.submitOTPRequest} />
          </>
        )
      case 3:
        return (
          <>
            <Logo />
            <VerifyOTP submit={this.submitOTP} />
          </>
        )
      case 4:
        return (
          <>
            <Logo />
            <Results results={this.state.results} />
          </>
        )
    }
  }
}