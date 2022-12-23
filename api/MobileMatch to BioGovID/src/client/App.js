import React from 'react';
import './App.css'

//Bio Gov
import Country from "./biogov-components/Country"
import DocumentType from "./biogov-components/DocumentType"
import CaptureLink from "./biogov-components/CaptureLink"
import Verify from "./biogov-components/Verify"

// Mobile Match
import CollectPII from "./mobilematch-components/CollectPII"
import SendOTP from "./mobilematch-components/SendOTP"
import VerifyOTP from "./mobilematch-components/VerifyOTP"

import Logo from './Logo';
import Results from "./Results"

export default class App extends React.Component {
  // MM to BioGovID (user) Template:
  // ------------------------------------------
  state = {
    asi: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    country: null,
    documentType: null,
    documents: {
      status: null,
    },
    results: null,
    asi: null,
    street: null,
    streetNumber: null,
    city: null,
    state: null,
    zip: null,
    pinCode: null,
    step: 0
  }
  // ------------------------------------------
  componentDidMount = () => fetch('/api/refreshToken');

  next = () => {
    this.setState({ step: this.state.step >= 4 ? 4 : this.state.step + 1})
    this.toggleBufferingWheel.off()
  }
  escalate = () => {
    this.setState({ step: this.state.step + 1.1})
    this.toggleBufferingWheel.off()
  }

  toggleBufferingWheel = {
    on: function () {
      document.getElementById("loading").style.visibility = "visible"
    },
    off: function () {
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
          this.toggleBufferingWheel.off()
          alert("Error: This country not supported.")
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
      .then(response => response.json())
      .then(async (data) => {
        if (data.message === 'Escalated.') {
          await this.escalate()
          return
        }
        this.next()
      })
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

  submitDocumentType = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({ documentType: document.getElementById("document-type").value })
    await this.fetch("/api/slverify/submitDocumentType")
    this.next()
  }

  submitCaptureLink = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phoneNumber").value,

    })
    await this.fetch("/api/doccapture/submitCaptureLink")
    this.next()
  }

  submitDocuments = async (documents) => {
    this.setState({ documents: documents })
  }

  submitSLVerify = async () => {
    this.toggleBufferingWheel.on()
    this.fetch("/api/slverify/submitSLVerify")
      .then(response => response.json())
      .then(async (data) => {
        await this.setState({ results: data })
        this.next()
      })
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
      case 2.1:
        return (
          <>
            <Logo />
            <DocumentType submit={this.submitDocumentType} />
          </>
        )
      case 3:
        return (
          <>
            <Logo />
            <VerifyOTP submit={this.submitOTP} />
          </>
        )
      case 3.1:
        return (
          <>
            <Logo />
            <CaptureLink submit={this.submitCaptureLink} />
          </>
        )
      case 4.1:
        return (
          <>
            <Logo />
            <Verify
              documents={this.state.documents}
              fetch={this.fetch}
              submit={this.submitSLVerify}
              submitDocuments={this.submitDocuments} />
          </>
        )
      case 4:
      case 5.1:
        return (
          <>
            <Logo />
            <Results results={this.state.results} />
          </>
        )
    }
  }
}