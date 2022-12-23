import React from 'react';
import Country from "./components/Country"
import CollectPII from "./components/CollectPII"
import Quiz from "./components/Quiz"
import Results from "./components/Results"
import Logo from './components/Logo';
import './App.css'

export default class App extends React.Component {
  // KBA (user) Template:
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
    dateOfBirth: {
      month: null,
      day: null,
      year: null
    },
    zip: null,
    results: null,
    questionSetId: null,
    conversationId: null,
    questions: null,
    quiz: null,
    step: 0
  }
  // ------------------------------------------

  componentDidMount = () => fetch('/api/refreshToken')

  next = () => {
    this.setState({ step: this.state.step === 3 ? 3 : this.state.step + 1})
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
          this.toggleBufferingWheel.off()
          alert("Error: This country not supported.")
          return
        }
          await this.setState({asi: data.transaction_id})
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
      dob: {
        month: document.getElementById("dateOfBirth").value.split("/")[0], 
        day:   document.getElementById("dateOfBirth").value.split("/")[1],
        year:  document.getElementById("dateOfBirth").value.split("/")[2]
      }
    })

    await this.fetch("/api/kba/config/submitPII")
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
    for (var i = 0; i < this.state.questions.length; ++i){
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
        this.setState({results: data})
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
            <Quiz submit={this.submitQuiz} questions={this.state.questions}/>
          </>
        )
      case 3:
        return (
          <>
            <Logo />
            <Results results={this.state.results} />
          </>
        )
    }
  }
}