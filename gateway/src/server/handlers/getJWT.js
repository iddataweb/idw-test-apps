// Generate a JWT using the authorization code received from 
// a completed Gateway session.
const request = async (auth, authCode) => {
  const axios = require('axios')
  let response = await axios({
    url: "https://preprod1.iddataweb.com/preprod-axn/axn/oauth2/token",
    method: "POST",
    data: {
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: auth.redirect_uri,
      client_id: auth.apikey,
      client_secret: auth.secret
    },
  headers: {
    accept: 'application/json',
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
  }).catch(error => console.log(error))
  console.log(response)
  return response.data.id_token
}

module.exports = {getJWT: request}

