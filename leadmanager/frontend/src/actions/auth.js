import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check the token and load the user:
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  // making the request with the config
  axios
    .get("./api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Login user:
export const login = (username, password) => (dispatch) => {
  //Headers to send on the request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ username, password });

  // making the request with the config
  axios
    .post("./api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

//Register User
export const register =
  ({ username, email, password }) =>
  (dispatch) => {
    //Headers to send on the request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //request body
    const body = JSON.stringify({ username, email, password });

    // making the request with the config
    axios
      .post("./api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: REGISTER_FAIL });
      });
  };

// Logout user:
export const logout = () => (dispatch, getState) => {
  // making the request with the config, we need to pass null as body here for this to work
  axios
    .post("./api/auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Set up config with token - helper function
export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState().auth.token;

  //Headers to send on the request
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
