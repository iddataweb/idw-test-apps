import React from "react"
const { auth } = require("../../../auth.js")
const { template } = require("../../../public/prefill-template")

const Login = () => {
  const redirect = () => {
    window.location.href = (
      `https://preprod1.iddataweb.com/preprod-axn/axn/oauth2/authorize?` +
      `response_type=code` +
      `&scope=openid` +
      `&client_id=${auth.apikey}` +
      `&state=${Math.floor(Math.random() * (100 - 1 + 1) + 1)}` + // state should be a random UUID, val between to values, ... (user's choice)
      `&redirect_uri=${auth.redirect_uri}`
    )
  }

  const togglePrefillForm = () => {
    let form = document.getElementById("prefill-form")
    let toggledOff = form.style.visibility === "hidden"
    if (toggledOff) {
      form.style.visibility = "visible"
      form.style.height = "auto"
      document.getElementById("prefill-toggle").innerHTML = "Return to Main Login"
      document.getElementById("login-button").style.display = "none"
    } else {
      form.style.visibility = "hidden"
      form.style.height = "0"
      document.getElementById("login-button").style.display = "block"
      document.getElementById("prefill-toggle").innerHTML = "You can optionally prefill your information, by clicking here."
    }
  }

  const submitPrefillForm = async () => {
    console.log(await fetch("/api/prefill", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await getFile(document.getElementById("prefill-file")))
    }).then(response => response.json())) 
   /* window.location.href = await fetch("/api/prefill", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await getFile(document.getElementById("prefill-file")))
    }).then(response => response.json())
   */   .then(data => data.url)

  }

  const getFile = async (e) => {
    let file = await new Response(e.files[0]).json()
    return file
  }

  return (
    <>
      <h1>Login</h1>
      <button className="button" id="login-button" onClick={redirect}>Login</button>
      <button id="prefill-toggle" onClick={togglePrefillForm}>
        You can optionally upload prefilled information, by clicking here.
      </button>
      <div id="prefill-form" style={{ visibility: "hidden", height: "0px" }}>
        <input id="prefill-file" type="file" style={{ display: "flex", alignSelf: "center" }}></input>
        <a download="prefill-template.json" href={`data:text/html;base64,${template}`}>
          <strong>Download Template</strong>
        </a>
        <button onClick={submitPrefillForm}>Upload</button>
      </div>
      <a target="blank" href="https://docs.iddataweb.com/docs/prefill-pii-from-source">
        To learn more about prefilling user data with AXN Gateway.
      </a>
    </>
  );
};
export default Login;
