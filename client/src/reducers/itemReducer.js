import {
  FETCH_ITEMS,
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
    case CREATE_ITEM:
    case EDIT_ITEM:
      return [...action.payload];
    case FETCH_ITEM:
      return state.filter((item) => item.id === action.payload._id);
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload._id);
    default:
      return state;
  }
};
