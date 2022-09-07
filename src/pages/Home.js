import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import { _getQuestions, _getUsers, _saveQuestionAnswer } from "../_DATA";

const Home = ({ ...props }) => {
  const [questionList, setQuestionList] = useState([]);

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
        setQuestionList(updateQuestionList);
      };
      getQuestions();
    }
  }, []);

  return (
    <>
      {" "}
      {questionList.length
        ? questionList.map((questionList, key) => {
            return (
              <div key={key}>
                <div style={{ marginTop: "12px", fontWeight: "bold" }}>
                  Would you rather? (hover and click to choose)
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
