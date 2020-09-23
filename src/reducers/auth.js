import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, users: [] }
  : { isLoggedIn: false, user: null, users: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case SEARCH_SUCCESS:
      console.log("reducer payload");
      console.log({
        ...state,
        users: payload,
      });
      return {
        ...state,
        users: payload,
      };
    case SEARCH_FAIL:
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
}
