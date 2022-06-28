import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
} from "./reducers/user.reducers";

import {
  addPollPartyReducer,
  createPollReducer,
  endPollReducer,
  getAllAssociatedPollsReducer,
  getAllPollsReducer,
  getSinglePollReducer,
  publishPollReducer,
  voteInPollReducer,
} from "./reducers/vote.reducers";

const reducer = combineReducers({
  // Users
  registerUser: userRegisterReducer,
  loginUser: userLoginReducer,

  // POLLS
  pollCreate: createPollReducer,
  pollsGetAll: getAllPollsReducer,
  pollGetSingle: getSinglePollReducer,
  pollVoteIn: voteInPollReducer,
  pollPublish: publishPollReducer,
  pollEnd: endPollReducer,
  pollsGetAllAssociated: getAllAssociatedPollsReducer,
  pollPartyAdd: addPollPartyReducer,
});

// Local storage matters
let userInfoFromStorage;
if (typeof window !== "undefined") {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
}

// initial state
const initialState = {
  loginUser: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
