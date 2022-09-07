import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = ({ ...props }) => {
  const [questionList, setQuestionList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!props.authenticatedUser?.id) {
      navigate("/login");
    } else {
      let updateQuestionList = [];
      for (let key in props.questions) {
        updateQuestionList.push(props.questions[key]);
      }
      setQuestionList(updateQuestionList);
    }
  }, []);

  return (
    <>
      {" "}
      {questionList.length
        ? questionList.map((questionList, key) => {
            console.log(props.authenticatedUser, questionList);
            if (questionList.author !== props.authenticatedUser.id) {
              return (
                <div key={key}>
                  <div style={{ marginTop: "12px", fontWeight: "bold" }}>
                    Would you rather? (hover and click to choose)
                  </div>
                  <div>
                    <em style={{ color: "red", cursor: "pointer" }}>
                      {questionList?.optionOne?.text}
                    </em>{" "}
                    or{" "}
                    <em
                      style={{ color: "purple", cursor: "pointer" }}
                      onClick={() => {}}
                    >
                      {questionList?.optionTwo?.text}
                    </em>
                  </div>
                </div>
              );
            }
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
