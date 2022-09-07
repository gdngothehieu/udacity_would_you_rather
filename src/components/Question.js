import { useEffect, useState } from "react";
import { _getQuestions, _getUsers, _saveQuestionAnswer } from "../_DATA";
import { useNavigate } from "react-router-dom";

const Question = ({ questionList, ...props }) => {
  const navigate = useNavigate();

  const [poll, setPoll] = useState(false);
  const [optionOneCount, setOptionOneCount] = useState(null);
  const [optionTwoCount, setOptionTwoCount] = useState(null);

  const voteAnswer = async (voteAnswer) => {
    const data = await _saveQuestionAnswer({
      authedUser: props.authenticatedUser.id,
      qid: questionList.id,
      answer: voteAnswer,
    });
    const usersData = await _getUsers();
    const questionData = await _getQuestions();
    setOptionOneCount(questionData[questionList.id]?.optionOne?.votes?.length);
    setOptionTwoCount(questionData[questionList.id]?.optionTwo?.votes?.length);
    // navigate(
    //   `questions/${questionList.id}?optionOneCount=${
    //     questionData[questionList.id]?.optionOne?.votes?.length
    //   }&optionTwoCount=${
    //     questionData[questionList.id]?.optionTwo?.votes?.length
    //   }`
    // );
    setPoll(true);
  };
  return (
    <>
      <div>
        <em
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => voteAnswer("optionOne")}
        >
          {questionList?.optionOne?.text}
        </em>{" "}
        or{" "}
        <em
          style={{ color: "purple", cursor: "pointer" }}
          onClick={() => voteAnswer("optionTwo")}
        >
          {questionList?.optionTwo?.text}
        </em>
      </div>
      {poll ? (
        <div>
          First Option: {optionOneCount}, Second Option: {optionTwoCount}
        </div>
      ) : null}
    </>
  );
};

export default Question;
