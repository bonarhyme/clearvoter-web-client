import axios from "axios";
import { SERVER_URL } from "../../data/variables";
import {
  CREATE_POLL_REQUEST,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAIL,
  GET_ALL_POLLS_REQUEST,
  GET_ALL_POLLS_SUCCESS,
  GET_ALL_POLLS_FAIL,
  GET_SINGLE_POLL_REQUEST,
  GET_SINGLE_POLL_SUCCESS,
  GET_SINGLE_POLL_FAIL,
} from "../constants/vote.constants";

export const createPollAction =
  (title, description, expiration, allowVpn) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_POLL_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${SERVER_URL}/api/polls/create`,
        {
          title,
          description,
          expiration,
          allowVpn,
        },
        config
      );
      dispatch({
        type: CREATE_POLL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_POLL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllPollsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_POLLS_REQUEST,
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${SERVER_URL}/api/polls/view-polls`,

      config
    );
    dispatch({
      type: GET_ALL_POLLS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POLLS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSinglePollAction = (slug) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_POLL_REQUEST,
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${SERVER_URL}/api/polls/view-poll/${slug}`,

      config
    );
    dispatch({
      type: GET_SINGLE_POLL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_POLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
