const express = require("express");
const app = express();
const { auth } = require("../../auth")
// ---------AXN GATEWAY------------
const { getJWT } = require("./handlers/getJWT")
// ---------AXN ADMIN--------------
const { getPrefilledGateway } = require("./handlers/prefill-helpers/getPrefilledGateway")
// --------------------------------
app.use(express.json({type: ['application/json', 'text/plain']}))
// --------------------------------
app.get("/redirect", async (req,res) => {
  // retrieve the auth code obtained from AXN Gateway.
  let authCode = req.query.code
  // exchange the auth code for the JSON Web Token containing our results.
  let jwt = await getJWT(auth, authCode)
  // split, then grab the payload portion of our jwt.
  let payload = jwt.split(`.`)[1] // output -> [0]header, [1]payload, [2]signature
  // convert the base64 encoded payload to JSON
  let jsonString = Buffer.from(payload, 'base64').toString().replace(/\/\/\/\//g, '')
  let data = JSON.parse(jsonString)
  // minifying the results sent for simplicity
  let results = {
    policyDecision: data.policyDecision,
    jti: data.jti,
    results: data.endpoint.endpointInstanceList[0]
  }
  // encoding the results before redirect
  let base64Results = Buffer.from(JSON.stringify(results)).toString("base64")
  // redirecting back to http://localhost:3000
  res.redirect(`http://localhost:3000/?results=${base64Results}`)
})
// --------------------------------
app.post("/api/prefill", async (req, res) => {
  let response = await getPrefilledGateway(args = req.body)
  res.send({url: response})
})
// --------------------------------
app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);