var request = async (auth, args) => {
  var axios = require('axios')
  var data = {
    asi: args.asi, 
    apikey: auth.forwardApiKey, 
    credential: auth.credential,
    appID: auth.appID,
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
            attributeType: "DOB",
            values: {
                day: args.dob.day,
                month: args.dob.month,
                year: args.dob.year
            }
        }
        
    ]
  }

  var token = auth.token

  var response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/slverify",
    method: 'post',
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + token,
    },
  });
  console.log(response)
  return response.data
};

module.exports = {postSLVerify: request}