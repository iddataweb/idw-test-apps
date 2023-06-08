const tests = {
  wasDenied: function (policyDecision) {
    return policyDecision === "deny"
  },
  errorMessage: {
    message: "something went wrong"
  }
}
module.exports = {tests: tests}