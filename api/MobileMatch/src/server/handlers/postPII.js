var request = async (auth, args) => {
  var axios = require('axios')
  var data = {
    apikey: auth.forwardApiKey,
    credentials: auth.credential,
    appID: auth.appID,
    asi: args.asi,
    userAttributes: [
      {
          attributeType: "FullName",
          values: {
              fname: args.firstName,
              mname: "",
              lname: args.lastName
          }
      },
      {
          attributeType: "InternationalAddress",
          values: {
              country: args.country,
              administrative_area_level_1: args.state,
              locality: args.city,
              postal_code: args.zip,
              route: args.street,
              street_number: args.streetNumber
          }
      },
      {
          attributeType: "InternationalTelephone",
          values: {
              dialCode: "1",
              telephone: args.phoneNumber
          }
      }
  ]
  }

  var response = await axios({
    url: 'https://api.preprod.iddataweb.com/v1/slverify',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + auth.token
    }
  })
  console.log(response)
  return response.data
}

module.exports = {postPII: request}