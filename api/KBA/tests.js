const tests = {
  wasDenied: function (policyDecision) {
    return policyDecision === "deny"
  },
  questionSetEmpty: function (questionSet) {
    return questionSet === null
  },
  statusFail: function (status) {
    return status === 'fail'
  },
  errorMessage: {
    message: "something went wrong"
  }
}
module.exports = {tests: tests}