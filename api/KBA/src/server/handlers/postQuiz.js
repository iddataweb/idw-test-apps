var request = async (auth, args) => {
var axios = require('axios')
var data = {
  asi: args.asi,
  apikey: auth.forwardApiKey,
  appID: auth.appID,
  credential: auth.credential,
  kbaRequest: {
    ConversationId: args.conversationId,
    Answers: {
      QuestionSetId: args.questionSetId,
      Questions: [
        {
          QuestionId: args.quiz[0].question,
          Choices: [
            {
              Choice: args.quiz[0].answer,
            },
          ],
        },
        {
          QuestionId: args.quiz[1].question,
          Choices: [
            {
              Choice: args.quiz[1].answer,
            },
          ],
        },
        {
          QuestionId: args.quiz[2].question,
          Choices: [
            {
              Choice: args.quiz[2].answer,
            },
          ],
        },
      ],
    },
  },
};

var token = auth.token

  var response = await axios({
    url: "https://api.preprod.iddataweb.com/v1/kba/submit",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: "Bearer " + token
    },
  });
  console.log(response)
  return response.data
};

module.exports = {postQuiz: request}



