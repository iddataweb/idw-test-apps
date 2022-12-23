const tests = {
  wasDenied: function (policyDecision) {
    return policyDecision === "deny"
  },
  wasEscalated: function (key, alternateApiKey){
    return key === alternateApiKey
  },
  errorMessage: {
    message: "something went wrong"
  }
}
module.exports = {tests: tests}