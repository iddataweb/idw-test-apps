import React from "react";

const Quiz = ({ submit, questions }) => {
  return (
    <>
      <h1>3. Quiz</h1><br />
      {questions.map(question => {
        return (
          <>
            <p>{question.Text.Statement}</p>
            <select id={JSON.stringify(question.QuestionId)}>
            {question.Choices.map(choice => {
              return <option value={choice.ChoiceId}>{choice.Text.Statement}</option>
            })}
            </select>
          </>
        )
      })}
      <button onClick={submit}>submit</button>
    </>
  );
};

export default Quiz;
