// Generate a Bearer token that grants access to AXN Admin Console.
const request = async () => {
  const axios = require('axios')
  const base64EncodedData = Buffer.from("your_admin_key" + ":" + "your_admin_secret").toString("base64")
  
  let response = await axios({
    method: "POST",
    url: "https://preprod.admin.iddataweb.com/axnadmin-core/token",
    headers: {
      Authorization: "Basic " + base64EncodedData,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    params: {
      "grant_type": "client_credentials"
    }
  }).catch(e => console.log(e))
  console.log(response)
  return response.data.access_token
}
module.exports = {getAdminToken: request}