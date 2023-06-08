const request = async (auth, args) => {
  const axios = require('axios');
  const params = {
    asi: args.asi
  };
  
  const response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/doccapture/results",
    method: "get",
    params: params,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + auth.token,
    },
  });
   return response.data
};
module.exports = { getDocumentCaptureResults: request }