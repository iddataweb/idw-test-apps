var request = async (auth, args) => {
  var axios = require("axios");
  var params = {
    type: "sms",
    dialCode: "1",
    telephone: args.phoneNumber,
    apikey: auth.forwardApiKey,
    credential: auth.credential,
    appID: auth.appID,
    asi: args.asi,
  };

  var response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/otp",
    method: 'get',
    params: params,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + auth.token,
    },
  });
  return response.data
};

module.exports = {getOTP: request}