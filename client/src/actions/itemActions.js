import axios from "axios";

import {
  FETCH_ITEMS,
  FETCH_ITEM,
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
} from "./types";

export const fetchItems = (id) => async (dispatch) => {
  const response = await axios.get(`/api/${id}`);

  dispatch({ type: FETCH_ITEMS, payload: response.data });
};

export const fetchItem = (userId, itemId) => async (dispatch) => {
  const response = await axios.get(`/api/${userId}/${itemId}`);

  dispatch({ type: FETCH_ITEM, payload: response.data });
};

export const createItem = (itemData, history) => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const response = await axios.post(`/api/${userId}/addItem`, itemData);
  dispatch({ type: CREATE_ITEM, payload: response.data });
  history.push("/dashboard");
};

export const editItem = (itemData, history) => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const itemId = itemData.id;
  const response = await axios.post(`/api/${userId}/edit/${itemId}`, itemData);
  dispatch({ type: EDIT_ITEM, payload: response.data });
  history.push("/dashboard");
};

export const deleteItem = (userId, itemRef, itemId, history) => async (
  dispatch
) => {
  await axios.delete(`/api/${userId}/${itemId}`);
  dispatch({ type: DELETE_ITEM, payload: itemRef });
  history.go();
};
