const setAuthenticatedUser = (id) => {
  return {
    type: "SET_AUTHENTICATED_USER",
    authenticatedUser: {
      id: id,
    },
  };
};

const getUsers = (users) => {
  return {
    type: "GET_USERS",
    users: users,
  };
};

const getQuestions = (questions) => {
  return {
    type: "GET_QUESTIONS",
    questions: questions,
  };
};

const getAuthenticatedUser = (authenticatedUser) => {
  return {
    type: "GET_AUTHENTICATED_USER",
    authenticatedUser: authenticatedUser,
  };
};
export { setAuthenticatedUser, getUsers, getQuestions, getAuthenticatedUser };
