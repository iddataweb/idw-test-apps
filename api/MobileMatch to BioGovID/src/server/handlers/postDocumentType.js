const request = async (auth, args) => {
  const axios = require('axios')
  const data = {
    apikey: auth.forwardApiKey,
    asi: args.asi,
    credential: auth.credential,
    appID: auth.appID,
    userAttributes: [
      {
        attributeType: "LicensePassportOrIDCard",
        values: {
          licensePassportOrIDCard: args.documentType
        }
      }
    ]
  }
  const response = await axios({
    url: 'https://api.preprod.iddataweb.com/v1/slverify',
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + auth.token,
    }
  })
  return response.data
}
module.exports = { postDocumentType: request }