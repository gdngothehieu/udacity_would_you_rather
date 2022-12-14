import { useEffect, useState } from "react";
import { _getUsers, _saveQuestion, _saveQuestionAnswer } from "../_DATA";
import { connect } from "react-redux";
import { getUsers, setAuthenticatedUser } from "../store/actions";
import { getInitialData } from "../utils/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
const SignIn = ({ ...props }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    let usersList = [];
    for (const key in props.users) {
      usersList.push(props.users[key]);
    }
    const updateUserList = usersList.map((data) => {
      return { value: data.id, label: data.name, ...data };
    });
    setOptions(updateUserList);
  }, [props.users]);

  const getData = async () => {
    const users = await _getUsers();
    let usersList = [];
    for (const key in users) {
      usersList.push(users[key]);
    }
    return usersList;
  };

  const handleSignIn = () => {
    let updateOption = selectedOption;

    const url = window.location.href;
    const strs = url.split("/");
    const id = strs.at(-1);
    const questionUrl = strs.at(-2);
    if (!updateOption.value) {
      return;
    }
    const query = url.split("?");
    const queryUrl = query.at(-1);

    props.dispatch(setAuthenticatedUser(updateOption.value));
    if (queryUrl !== "isPollSearch=true") {
      navigate("/add");
    } else {
      navigate("/error-not-found");
    }
  };
  return (
    <>
      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
        Welcome to Would You Rather App
      </div>
      <div style={{ width: "50%", marginTop: "9px", marginBottom: "9px" }}>
        {options.length ? (
          <Select
            options={options}
            onChange={(e) => {
              setSelectedOption({
                value: e.value,
                label: e.label,
              });
            }}
          />
        ) : null}
      </div>

      <button
        onClick={() => {
          handleSignIn();
        }}
      >
        Sign In
      </button>
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
export default connect(mapStatesToProps, null)(SignIn);
