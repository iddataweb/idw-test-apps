import React from 'react';
import './App.css'

//KBA
import Quiz from "./kba-components/Quiz"
import CollectDOB from "./kba-components/CollectDOB"
// Mobile Match
import CollectPII from "./mobilematch-components/CollectPII"
import SendOTP from "./mobilematch-components/SendOTP"
import VerifyOTP from "./mobilematch-components/VerifyOTP"
import Country from "./mobilematch-components/Country"

import Logo from './Logo';
import Results from "./Results"

export default class App extends React.Component {
  // MM to KBA (user) Template:
  // ------------------------------------------
  state = {
    asi: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    country: null,
    dateOfBirth: {
      month: null,
      day: null,
      year: null
    },
    questionSetId: null,
    conversationId: null,
    questions: null,
    quiz: null,
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
      .then(() => {
        this.next()
      });
  }

  submitOTP = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({ pinCode: document.getElementById("pinCode").value })
    await this.fetch("/api/slverify/submitOTP")
      .then(response => response.json())
      .then(data => this.setState({ results: data }))
    this.next()
  }

  submitDOB = async () => {
    this.toggleBufferingWheel.on()
    await this.setState({
      dob: {
        month: document.getElementById("dateOfBirth").value.split("/")[0],
        day: document.getElementById("dateOfBirth").value.split("/")[1],
        year: document.getElementById("dateOfBirth").value.split("/")[2]
      }
    })

    await this.fetch("/api/kba/config/submitDOB")
      .then(response => response.json())
      .then(data => {
        this.setState({
          questions: data.kbaQuestions.QuestionSet.Questions,
          conversationId: data.kbaQuestions.ConversationId,
          questionSetId: data.kbaQuestions.QuestionSet.QuestionSetId
        })
        this.next()
      })
  }

  submitQuiz = async () => {
    this.toggleBufferingWheel.on()
    var quiz = []
    for (var i = 0; i < this.state.questions.length; ++i) {
      var question = this.state.questions[i].QuestionId
      var answer = document.getElementById(question).value
      quiz.push({
        question: question,
        answer: answer
      })
    }
    await this.setState({
      quiz: quiz
    })
    await this.fetch("/api/kba/submit/submitQuiz")
    await this.fetch("/api/slverify/submitSLVerify")
      .then(response => response.json())
      .then(data => {
        this.setState({ results: data })
        this.next()
      })
  }

  render() {
    switch (this.state.step) {
      case 0:
        return (<>
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
            <CollectDOB submit={this.submitDOB} />
          </>
        )
      case 3.1:
        return (
          <>
            <Logo />
            <Quiz submit={this.submitQuiz} questions={this.state.questions}/>
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
      case 4.1:
        return (
          <>
            <Logo />
            <Results results={this.state.results} />
          </>
        )
    }
  }
}