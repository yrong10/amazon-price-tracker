import axios from "axios";

import { GET_DETAILS, DELETE_DETAILS, GET_ERRORS } from "./types";

export const getDetails = (urlData) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user.id;
    urlData.id = userId;
    const response = await axios.post("/api/getDetails", urlData);
    dispatch({ type: GET_DETAILS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const deleteDetails = () => (dispatch) => {
  dispatch({ type: DELETE_DETAILS });
};
