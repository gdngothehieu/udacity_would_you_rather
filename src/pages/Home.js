import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { _getQuestions, _getUsers, _saveQuestionAnswer } from "../_DATA";

const Home = ({ ...props }) => {
  const [questionList, setQuestionList] = useState([]);
  const [answerPoll, setAnswerPoll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.authenticatedUser?.id) {
      navigate("/login");
    } else {
      const getQuestions = async () => {
        let updateQuestionList = [];

        const questions = await _getQuestions();

        for (let key in questions) {
          updateQuestionList.push(questions[key]);
        }
        const poll = answerPoll;
        updateQuestionList = updateQuestionList
          .filter((updateQuestion) => {
            return poll
              ? updateQuestion.optionOne.votes.find(
                  (vote) => vote === props.authenticatedUser.id
                ) ||
                  updateQuestion.optionTwo.votes.find(
                    (vote) => vote === props.authenticatedUser.id
                  )
              : !updateQuestion.optionOne.votes.find(
                  (vote) => vote === props.authenticatedUser.id
                ) &&
                  !updateQuestion.optionTwo.votes.find(
                    (vote) => vote === props.authenticatedUser.id
                  );
          })
          .sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
        setQuestionList(updateQuestionList);
      };
      getQuestions();
    }
  }, [answerPoll]);

  return (
    <>
      {" "}
      <div>
        <em
          style={{ cursor: "pointer", color: answerPoll ? "orange" : "black" }}
          onClick={() => {
            setAnswerPoll(true);
          }}
        >
          Answer
        </em>{" "}
        |{" "}
        <em
          style={{ cursor: "pointer", color: !answerPoll ? "orange" : "black" }}
          onClick={() => {
            setAnswerPoll(false);
          }}
        >
          Unanswer
        </em>
      </div>
      {questionList.length
        ? questionList.map((questionList, key) => {
            return (
              <div key={key}>
                <div style={{ marginTop: "12px", fontWeight: "bold" }}>
                  Would you rather?
                </div>
                <Question
                  authenticatedUser={props.authenticatedUser}
                  questionList={questionList}
                ></Question>
              </div>
            );
          })
        : null}{" "}
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

export default connect(mapStatesToProps, null)(Home);
