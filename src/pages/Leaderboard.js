import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Leaderboard = ({ ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.authenticatedUser?.id) {
      navigate("/login");
    }
  }, [props.authenticatedUser]);
};
const mapStatesToProps = ({ users, questions, authenticatedUser }) => {
  return {
    users: users,
    questions,
    authenticatedUser: authenticatedUser,
  };
};
export default Leaderboard;
