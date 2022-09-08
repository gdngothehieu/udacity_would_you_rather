import { useEffect, useState } from "react";
import { _getQuestions, _getUsers, _saveQuestionAnswer } from "../_DATA";
import { useNavigate } from "react-router-dom";

const Question = ({ questionList, ...props }) => {
  const navigate = useNavigate();

  const [poll, setPoll] = useState(false);
  const [optionOneCount, setOptionOneCount] = useState(null);
  const [optionTwoCount, setOptionTwoCount] = useState(null);

  const voteAnswer = async (voteAnswer) => {
    navigate(`question/${questionList.id}`);
  };
  return (
    <>
      <div onClick={() => voteAnswer("optionOne")}>
        <em style={{ color: "red", cursor: "pointer" }}>
          {questionList?.optionOne?.text}
        </em>{" "}
        or{" "}
        <em style={{ color: "purple", cursor: "pointer" }}>
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
