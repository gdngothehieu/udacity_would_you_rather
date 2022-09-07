import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../store/actions";
import { _getQuestions, _saveQuestion } from "../_DATA";

const NewQuestion = ({ ...props }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!props.authenticatedUser.id) {
      navigate("/login");
    }
  }, [props.authenticatedUser]);

  return (
    <>
      <div style={{ marginTop: "19px", fontSize: "bold" }}>
        Would you rather?{" "}
        <input
          placeholder={"Option one"}
          onChange={(e) => setOptionOne(e.target.value)}
        />
        or{" "}
        <input
          placeholder={"Option two"}
          onChange={(e) => setOptionTwo(e.target.value)}
        />
        <button
          onClick={async () => {
            await _saveQuestion({
              optionOneText: optionOne,
              optionTwoText: optionTwo,
              author: props.authenticatedUser.id,
            });
            const data = await _getQuestions();
          }}
        >
          submit
        </button>
      </div>
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
export default connect(mapStatesToProps, null)(NewQuestion);
