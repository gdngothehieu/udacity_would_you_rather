import { useEffect, useState, useTransition } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _getUsers } from "../_DATA";

const Leaderboard = ({ ...props }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.authenticatedUser?.id) {
      navigate("/login");
    }
    const getUsers = async () => {
      const data = await _getUsers();
      let userList = [];
      for (const key in data) {
        let count = 0;
        count =
          Object.keys(data[key].answers).length + data[key].questions.length;
        let answerCount = 0;
        answerCount = Object.keys(data[key].answers).length;
        data[key]["score"] = count;
        data[key]["answerCount"] = answerCount;

        userList.push(data[key]);
      }
      userList.sort((a, b) => {
        return a.score + b.score;
      });
      setUsers(userList);
    };
    getUsers();
  }, [props.authenticatedUser]);
  return (
    <>
      <div style={{ marginTop: "19px" }}>
        {users.length
          ? users.map((user, index) => {
              return (
                <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                  <div style={{ display: "flex" }}>
                    {" "}
                    {user?.avatarURL ? (
                      <img
                        src={user?.avatarURL}
                        width={"50px"}
                        length={"50px"}
                        style={{ marginRight: "50px" }}
                      />
                    ) : (
                      <div style={{ width: "50px", height: "50px" }}></div>
                    )}
                    <div style={{ display: "grid" }}>
                      <div>{user.name}</div>
                      <div>Total Score: {user.score} </div>
                      <div>Question asked: {user.questions.length}</div>
                      <div>Answers: {user.answerCount}</div>
                    </div>{" "}
                  </div>
                </div>
              );
            })
          : null}
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
export default connect(mapStatesToProps)(Leaderboard);
