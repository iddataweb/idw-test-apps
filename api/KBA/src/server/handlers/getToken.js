var request = async (auth) => {
  var axios = require('axios')
  var user = auth.apikey;
  var password = auth.secret;
  var base64encodedData = Buffer.from(user + ":" + password).toString("base64");
  
  var response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/token",
    method: "post",
    params: {
      grant_type: "client_credentials",
    },
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Basic " + base64encodedData,
    },
  });
  console.log(response)
  return response.data.access_token;
};

module.exports = {getToken: request}