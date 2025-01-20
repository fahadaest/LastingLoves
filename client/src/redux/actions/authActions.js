import { LOGIN, LOGOUT } from '../types';

export const loginUser = (email, password) => async (dispatch) => {
  const user = { email };
  dispatch({
    type: LOGIN,
    payload: user,
  });
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
