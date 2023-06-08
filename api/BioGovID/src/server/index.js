const express = require("express");
const app = express();
const { auth } = require("../../auth")
const { tests } = require("../../tests") 
// -------------- AXN Verify ----------------
const { getToken } = require("./handlers/getToken");
const { getDocumentCaptureLink } = require("./handlers/getDocumentCaptureLink")
const { getDocumentCaptureResults } = require("./handlers/getDocumentCaptureResults")
const { postCountry } = require("./handlers/postCountry")
const { postDocumentType } = require("./handlers/postDocumentType")
const { postSLVerify } = require("./handlers/postSLVerify")
// ------------------------------------------
app.use(express.json({type: ['application/json', 'text/plain']}))
// ------------------------------------------
app.get("/api/refreshToken", async (req, res) => {
  if (Date.now() > auth.expires || auth.token === null){ // refresh token if null or expired
    auth.token = await getToken(auth)
    auth.expires += (30 * 60 * 1000) // expire token in 30min
  }
});
// ------------------------------------------
app.post("/api/slverify/submitCountry", async (req, res) => {
  let response = await postCountry(auth, args = req.body)
  if (tests.wasDenied(response.policyDecision)){
    res.send(tests.errorMessage)
    return
  }
  auth.forwardApiKey = response.forwardApiKey
  res.send(response)
});
// ------------------------------------------
app.post("/api/slverify/submitDocumentType", async (req, res) => {
  let response = await postDocumentType(auth, args = req.body)
  auth.forwardApiKey = response.forwardApiKey
  res.send(response)
});
// ------------------------------------------
app.post("/api/doccapture/submitCaptureLink", async (req, res) => {
  let response = await getDocumentCaptureLink(auth, args = req.body)
  res.send(response)
});
// ------------------------------------------
app.post("/api/doccapture/getDocumentCaptureResults", async (req, res) => {
  let response = await getDocumentCaptureResults(auth, args = req.body)
  res.send(response)
});
// ------------------------------------------
app.post("/api/slverify/submitSLVerify", async (req, res) => {
  let response = await postSLVerify(auth, args = req.body)
  res.send(response)
});
// ------------------------------------------
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);