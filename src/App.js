import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { connect } from "react-redux";
import { getUsers, setAuthenticatedUser } from "./store/actions";
import { getInitialData } from "./utils/constants";
import { useEffect } from "react";
import NewQuestion from "./pages/NewQuestion";
import Leaderboard from "./pages/Leaderboard";
import Home from "./pages/Home";
import NotFound404 from "./pages/NotFound404";
import Poll from "./pages/Poll";

const App = ({ ...props }) => {
  useEffect(() => {
    const data = props.initData();
  }, []);

  return (
    <BrowserRouter>
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <div
        style={{
          display: "flex",
          textDecoration: "none",
        }}
      >
        <Link style={{ marginRight: "9px", textDecoration: "none" }} to="/">
          Home
        </Link>
        <Link style={{ marginRight: "9px", textDecoration: "none" }} to="/add">
          New Question
        </Link>
        <Link
          style={{ marginRight: "9px", textDecoration: "none" }}
          to="/leaderboard"
        >
          Leaderboard
        </Link>
        {!props.authenticatedUser.id ? (
          <Link
            style={{
              marginRight: "9px",
              textDecoration: "none",
            }}
            to="/login"
          >
            Login
          </Link>
        ) : (
          <>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                props.setAuthenticatedUser();
              }}
            >
              Log out
            </div>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/add" element={<NewQuestion />}></Route>
        <Route path="/question/:qid" element={<Poll />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
    initData: () => {
      dispatch(getInitialData());
    },
    setAuthenticatedUser: () => {
      dispatch(setAuthenticatedUser(null));
    },
  };
};

const mapStatesToProps = ({ users, questions, authenticatedUser }) => {
  return {
    users: users,
    questions,
    authenticatedUser: authenticatedUser,
  };
};
export default connect(mapStatesToProps, mapDispatchToProps)(App);
