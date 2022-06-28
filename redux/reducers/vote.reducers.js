import { USER_LOGOUT } from "../constants/user.constants";
import {
  CREATE_POLL_FAIL,
  CREATE_POLL_REQUEST,
  CREATE_POLL_SUCCESS,
  GET_ALL_POLLS_FAIL,
  GET_ALL_POLLS_REQUEST,
  GET_ALL_POLLS_SUCCESS,
} from "../constants/vote.constants";

export const createPollReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POLL_REQUEST:
      return { loading: true };
    case CREATE_POLL_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case CREATE_POLL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getAllPollsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_POLLS_REQUEST:
      return { loading: true };
    case GET_ALL_POLLS_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case GET_ALL_POLLS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
