import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { _getQuestions, _getUsers, _saveQuestionAnswer } from "../_DATA";

const Poll = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [question, setQuestion] = useState({});
  const [author, setAuthor] = useState({});

  const [poll, setPoll] = useState(false);
  const [optionOneCount, setOptionOneCount] = useState(null);
  const [optionTwoCount, setOptionTwoCount] = useState(null);
  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await _getQuestions();
      const author = await _getUsers();
      const url = window.location.href;
      const strs = url.split("/");
      const id = strs.at(-1);

      if (data[id]) {
        setQuestion(data[id]);
        setAuthor(author[data[id].author]);
      } else {
        navigate("/error-not-found");
      }
    };
    if (!props.authenticatedUser.id) {
      navigate("/login?isPollSearch=true");
    } else {
      getData();
    }
  }, []);

  const votePoll = async (option) => {
    setDisable(true);
    const data = await _saveQuestionAnswer({
      authedUser: props.authenticatedUser.id,
      qid: question.id,
      answer: option,
    });
    const usersData = await _getUsers();
    const questionData = await _getQuestions();
    setOptionOneCount(questionData[question.id]?.optionOne?.votes?.length);
    setOptionTwoCount(questionData[question.id]?.optionTwo?.votes?.length);
    setPoll(true);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        {author ? (
          <img
            src={author?.avatarURL}
            style={{
              width: "50px",
              height: "50px",
              marginTop: "20px",
              marginRight: "20px",
            }}
          />
        ) : null}
        <div style={{ marginTop: "19px" }}>
          Would you rather?{" "}
          {!disable ? (
            <div>
              <em
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => {
                  votePoll("optionOne");
                }}
              >
                {" "}
                {question?.optionOne?.text}{" "}
              </em>{" "}
              or{" "}
              <em
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  votePoll("optionTwo");
                }}
              >
                {" "}
                {question?.optionTwo?.text}{" "}
              </em>
            </div>
          ) : (
            <div>
              <em style={{ color: "red" }}> {question?.optionOne?.text} </em> or{" "}
              <em style={{ color: "blue" }}> {question?.optionTwo?.text} </em>
            </div>
          )}
        </div>
      </div>

      {poll ? (
        <>
          <div>
            <b> Option 1:</b> {optionOneCount}{" "}
            {(optionOneCount * 100) / (optionOneCount + optionTwoCount)} %<br />{" "}
            <b>Option 2:</b> {optionTwoCount}{" "}
            {(optionTwoCount * 100) / (optionOneCount + optionTwoCount)} %
          </div>
          <div></div>
        </>
      ) : null}
    </>
  );
};
const mapStatesToProps = ({ users, questions, authenticatedUser }) => {
  return {
    users: users,
    questions,
    authenticatedUser: authenticatedUser,
  };
};
export default connect(mapStatesToProps)(Poll);
