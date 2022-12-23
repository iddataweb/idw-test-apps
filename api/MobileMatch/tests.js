const tests = {
  wasRetried: function(currkey,newkey){
    return currkey === newkey
  },
  wasDenied: function(policyDecision){
    return policyDecision === "deny"
  },
  errorMessage: {
    message: "something went wrong"
  }
}
module.exports = { tests: tests}