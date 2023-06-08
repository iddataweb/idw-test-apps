const request = async (auth, args) => {
  const axios = require('axios')
  const params = {
    dialCode: "1",
    telephone: args.phoneNumber,
    credential: auth.credential,
    apikey: auth.forwardApiKey,
    asi: args.asi
  }
  const response = await axios({
    url: 'https://api.preprod.iddataweb.com/v1/doccapture/sendlink',
    method: 'GET',
    params: params,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: 'Bearer ' + auth.token 
    }
  }).catch(e => console.log(e))
  console.log(response)
  return response.data
}
module.exports = { getDocumentCaptureLink: request}