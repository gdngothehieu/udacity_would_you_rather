import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({ ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.authenticatedUser.id) {
      navigate("/login");
    }
  }, [props.authenticatedUser]);

  return <>abc</>;
};
const mapStatesToProps = ({ users, questions, authenticatedUser }) => {
  return {
    users: users,
    questions,
    authenticatedUser: authenticatedUser,
  };
};
export default connect(mapStatesToProps, null)(NewQuestion);
