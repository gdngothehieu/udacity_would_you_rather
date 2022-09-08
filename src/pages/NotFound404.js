import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { _getQuestions } from "../_DATA";

const NotFound404 = ({ ...props }) => {
  const navigate = useNavigate();
  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  let query = useQuery();

  useEffect(() => {
    const getData = async () => {
      const data = await _getQuestions();
      const url = window.location.href;
      const strs = url.split("/");
      const id = strs.at(-1);
    };
    getData();
  }, []);
  return (
    <>
      <div>Sorry our page is not found! 404</div>
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
export default connect(mapStatesToProps)(NotFound404);
