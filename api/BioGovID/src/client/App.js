import React from 'react';
import './App.css'

import Country from "./components/Country"
import DocumentType from "./components/DocumentType"
import CaptureLink from "./components/CaptureLink"
import Verify from "./components/Verify"
import Results from "./components/Results"
import Logo from './components/Logo';

export default class App extends React.Component {
  // BioGovID (user) Template:
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
    step: 0
  }
  // ------------------------------------------
  componentDidMount = () => fetch('/api/refreshToken');

  next = () => {
    this.setState({ step: this.state.step === 4 ? 4 : this.state.step + 1})
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
      .then(data => {
        if (data.message === "something went wrong") {
          this.toggleBufferingWheel.off()
          alert("Error: This country not supported.")
          return
        }
          this.setState({asi: data.transaction_id})
          this.next()
      })
  }

  submitDocumentType = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({documentType: document.getElementById("document-type").value})
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
    await this.setState({documents: documents})
  }

  submitSLVerify = async () => {
    this.toggleBufferingWheel.on()
    await this.fetch("/api/slverify/submitSLVerify")
      .then(response => response.json())
      .then(async (data) => {
          await this.setState({results: data})
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
            <DocumentType submit={this.submitDocumentType} />
          </>
        )
        case 2:
        return (
          <>
            <Logo />
            <CaptureLink submit={this.submitCaptureLink} />
          </>
        )
      case 3:
        return (
          <>
            <Logo />
            <Verify
              fetch={this.fetch} 
              documents={this.state.documents}
              submitDocuments={this.submitDocuments}
              submitSLVerify={this.submitSLVerify}
              />
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