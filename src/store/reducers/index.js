import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";

const users = (state = {}, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        ...action.users,
      };
    case "ADD_QUESTION_TO_USER":
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([
            action.questionId,
          ]),
        },
      };
    case "ADD_ANSWER_TO_USER":
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    default:
      return state;
  }
};

const questions = (state = {}, action) => {
  switch (action.type) {
    case "GET_QUESTIONS":
      return {
        ...state,
        ...action.questions,
      };
    default:
      return state;
  }
};

const authenticatedUser = (state = {}, action) => {
  switch (action.type) {
    case "GET_AUTHENTICATED_USER":
      return {
        ...state,
        ...action.authenticatedUser,
      };
    case "SET_AUTHENTICATED_USER":
      return {
        ...state,
        ...action.authenticatedUser,
      };
    default:
      return state;
  }
};

export default combineReducers({
  loadingBar: loadingBarReducer,
  users,
  questions,
  authenticatedUser,
});
