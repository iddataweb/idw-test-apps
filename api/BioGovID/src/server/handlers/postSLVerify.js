const request = async (auth, args) => {
  const { attributeTemplates } = require("../documentAttributeTemplates")
  const axios = require('axios')
  const data = {
    asi: args.asi,
    apikey: auth.forwardApiKey,
    credential: auth.credential,
    appID: auth.appID,
    userAttributes: attributeTemplates[args.documentType](args)
  }

  const response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/slverify",
    method: 'POST',
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + auth.token,
    },
  }).catch(e => console.log(e))
  console.log(response)
  return response.data
};
module.exports = { postSLVerify: request }