const request = async (auth) => {
  const axios = require('axios')
  const user = auth.apikey;
  const password = auth.secret;
  const base64encodedData = Buffer.from(user + ":" + password).toString("base64");
  
  const response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/token",
    method: "POST",
    params: {
      grant_type: "client_credentials",
    },
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Basic " + base64encodedData,
    },
  });
  return response.data.access_token;
};
module.exports = {getToken: request}