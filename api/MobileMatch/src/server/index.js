const express = require("express");
const app = express();
const { auth } = require("../../auth")
const { tests } = require("../../tests")
// -------------- AXN Verify  ---------------
const { getToken } = require("./handlers/getToken");
const { getOTP } = require("./handlers/getOTP")
const { postCountry } = require("./handlers/postCountry")
const { postPII } = require("./handlers/postPII")
const { postOTP } = require("./handlers/postOTP")
// ------------------------------------------
app.use(express.json({ type: ['application/json', 'text/plain'] }))
// ------------------------------------------
app.get("/api/refreshToken", async (req, res) => {
  if (Date.now() > auth.expires || auth.token === null) { // refresh token if null or expired
    auth.token = await getToken(auth)
    auth.expires += (30 * 60 * 1000) // expire token in 30min
  }
});
// ------------------------------------------
app.post("/api/slverify/submitCountry", async (req, res) => {
  let response = await postCountry(auth, args = req.body)
  if (tests.wasDenied(response.policyDecision)) {
    res.send(tests.errorMessage)
    return
  }
  auth.forwardApiKey = response.forwardApiKey
  res.send(response)
});
// ------------------------------------------
app.post("/api/slverify/submitPII", async (req, res) => {
  let response = await postPII(auth, args = req.body)
  auth.forwardApiKey = response.forwardApiKey
  res.send(response)
})
// ------------------------------------------
app.post("/api/slverify/submitOTPRequest", async (req, res) => {
  let response = await getOTP(auth, args = req.body)
  res.send(response)
})
// ------------------------------------------
app.post("/api/slverify/submitOTP", async (req, res) => {
  let response = await postOTP(auth, args = req.body)
  res.send(response)
})
// ------------------------------------------
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);