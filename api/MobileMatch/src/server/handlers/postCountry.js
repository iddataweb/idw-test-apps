var request = async (auth, args) => {
  var axios = require("axios");
  var data = {
    apikey: auth.apikey,
    credential: auth.credential,
    appID: auth.appID,
    userAttributes: [
      {
        attributeType: "Country",
        values: {
          country: args.country,
        },
      },
    ],
  };
  
  var response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/slverify",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + auth.token,
    },
  });
  console.log(response)
  return response.data;
};

module.exports = {postCountry: request}
