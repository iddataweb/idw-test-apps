const auth = {
  token: null,
  forwardApiKey: null,
  expires: Date.now(),
  apikey: "your_workflow_apikey",
  secret: "your_workflow_secret",
  alternateApiKey: "your_kba_apikey",
  credential: "credential@org",
  appID: "application name"
}
module.exports = {auth: auth}