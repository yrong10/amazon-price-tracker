import { GET_DETAILS, DELETE_DETAILS } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return action.payload;
    case DELETE_DETAILS:
      return {};
    default:
      return state;
  }
};
