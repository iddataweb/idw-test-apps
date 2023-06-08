import React from 'react';
import Logo from './components/Logo'
import Login from "./components/Login"
import Results from "./components/Results"
import { Buffer } from 'buffer';
import './App.css'

export default class App extends React.Component {
 // Gateway Template
  state = {
    results: null
  }
  
  componentDidMount = async () => {
    // results are returned as a JSON Web Token
    let jwt = (new URL(document.location)).searchParams.get("results") || null
    if (jwt === null) return;
    // to convert our results to plain JSON:
    
    let results = JSON.parse(
      Buffer.from(jwt, 'base64')
            .toString()
            .replaceAll("\\\\", "") // cleaning results
      )
    // 
    await this.setState({
      results: results || null
    })
  }

  render() {
    return this.state.results === null ?       
    <><Logo/><Login/></> :
    <><Logo/><Results results={this.state.results}/></>
  }
}