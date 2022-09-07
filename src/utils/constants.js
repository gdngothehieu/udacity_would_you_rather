import { getQuestions, getUsers } from "../store/actions";
import { _getQuestions, _getUsers } from "../_DATA";

const getInitialData = () => {
  return async (dispatch) => {
    const response = await _getUsers();
    const questionResponse = await _getQuestions();
    let userList = [];
    for (const key in response) {
      userList.push(response[key]);
    }
    dispatch(getUsers(userList));
    dispatch(getQuestions(questionResponse));
  };
};

export { getInitialData };
