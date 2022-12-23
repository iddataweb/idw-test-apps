var request = async (auth, args) => {
  var axios = require("axios");
  var data = {
    asi: args.asi,
    apikey: auth.forwardApiKey,
    credential: auth.credential,
    appID: auth.appID,
    userAttributes: [
      {
        attributeType: "PINCode",
        values: {
          pincode: args.pinCode,
          pinType: "sms",
        },
      },
      {
        attributeType: "InternationalTelephone",
        values: {
          dialCode: "1",
          telephone: args.phoneNumber,
        },
      },
      {
        attributeType: "PINDeliveryPreference",
        values: {
          pindeliverypreference: "sms",
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
  return response.data
};

module.exports = {postOTP: request}
