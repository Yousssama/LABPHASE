import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  SET_SELECTED,
  CLEAR_SELECTED
} from "../../types";

const handleContactError = (dispatch, err) => {
  const errorMsg = err.response && err.response.data.msg ? err.response.data.msg : 'An error occurred';
  dispatch({ type: CONTACT_ERROR, payload: errorMsg });
};

export const getContacts = () => async dispatch => {
  try {
    const res = await axios.get("/api/contacts/");
    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    handleContactError(dispatch, err);
  }
};

export const addContact = contact => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/contacts/", contact, config);
    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    handleContactError(dispatch, err);
  }
};

export const deleteContact = id => async dispatch => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    handleContactError(dispatch, err);
  }
};

export const updateContact = ({ _id, ...contact }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put(`/api/contacts/${_id}`, contact, config);
    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    handleContactError(dispatch, err);
  }
};


export const filterContacts = text => {
  return { type: FILTER_CONTACT, payload: text };
};

export const setSelected = contact => {
  return { type: SET_SELECTED, payload: contact };
};

export const clearSelected = () => {
  return { type: CLEAR_SELECTED };
};
