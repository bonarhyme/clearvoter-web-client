import { USER_LOGOUT } from "../constants/user.constants";
import {
  ADD_POLL_LOCATION_FAIL,
  ADD_POLL_LOCATION_REQUEST,
  ADD_POLL_LOCATION_RESET,
  ADD_POLL_LOCATION_SUCCESS,
  ADD_POLL_PARTY_FAIL,
  ADD_POLL_PARTY_REQUEST,
  ADD_POLL_PARTY_RESET,
  ADD_POLL_PARTY_SUCCESS,
  CREATE_POLL_FAIL,
  CREATE_POLL_REQUEST,
  CREATE_POLL_RESET,
  CREATE_POLL_SUCCESS,
  END_POLL_FAIL,
  END_POLL_REQUEST,
  END_POLL_SUCCESS,
  GET_ALL_ASSOCIATED_FAIL,
  GET_ALL_ASSOCIATED_REQUEST,
  GET_ALL_ASSOCIATED_SUCCESS,
  GET_ALL_POLLS_FAIL,
  GET_ALL_POLLS_REQUEST,
  GET_ALL_POLLS_SUCCESS,
  GET_SINGLE_POLL_FAIL,
  GET_SINGLE_POLL_REQUEST,
  GET_SINGLE_POLL_SUCCESS,
  PUBLISH_POLL_FAIL,
  PUBLISH_POLL_REQUEST,
  PUBLISH_POLL_SUCCESS,
  VOTE_IN_POLL_FAIL,
  VOTE_IN_POLL_REQUEST,
  VOTE_IN_POLL_SUCCESS,
} from "../constants/vote.constants";

export const createPollReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POLL_REQUEST:
      return { loading: true };
    case CREATE_POLL_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case CREATE_POLL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CREATE_POLL_RESET:
      return {};
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

export const getSinglePollReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_POLL_REQUEST:
      return { loading: true };
    case GET_SINGLE_POLL_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case GET_SINGLE_POLL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const voteInPollReducer = (state = {}, action) => {
  switch (action.type) {
    case VOTE_IN_POLL_REQUEST:
      return { loading: true };
    case VOTE_IN_POLL_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case VOTE_IN_POLL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const publishPollReducer = (state = {}, action) => {
  switch (action.type) {
    case PUBLISH_POLL_REQUEST:
      return { loading: true };
    case PUBLISH_POLL_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case PUBLISH_POLL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const endPollReducer = (state = {}, action) => {
  switch (action.type) {
    case END_POLL_REQUEST:
      return { loading: true };
    case END_POLL_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case END_POLL_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getAllAssociatedPollsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ASSOCIATED_REQUEST:
      return { loading: true };
    case GET_ALL_ASSOCIATED_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case GET_ALL_ASSOCIATED_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const addPollPartyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POLL_PARTY_REQUEST:
      return { loading: true };
    case ADD_POLL_PARTY_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case ADD_POLL_PARTY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ADD_POLL_PARTY_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const addPollLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POLL_LOCATION_REQUEST:
      return { loading: true };
    case ADD_POLL_LOCATION_SUCCESS:
      return { loading: false, success: true, pollInfo: action.payload };
    case ADD_POLL_LOCATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ADD_POLL_LOCATION_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
