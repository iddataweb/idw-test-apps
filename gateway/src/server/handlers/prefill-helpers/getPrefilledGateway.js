// Generate a Gateway link using prefilled user data.
const { getAdminToken } = require("./getAdminToken")
const { auth } = require("../../../../auth")

const request = async (args) => {
  const axios = require("axios")
  const token = await getAdminToken() // grants access to AXN Admin Console.

  let response = await axios({
    method: "POST",
    url: "https://api.preprod.iddataweb.com/v1/admin/verification/link",
    headers: {
      accept: 'application/json',
      Authorization: "Bearer " + token,
    },
    data: {
      apiKey: "your-api-key",
      redirectURL: "your-redirect-url",
      credential: "your-application-credential",
      IDP: 'google',
      country: 'US',
      userAttributes: args
    }
  }).catch(e => console.log(e))
  console.log(response)
  //return response.data.url
}
module.exports = {getPrefilledGateway: request}