import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../../types";

export const setAlert = (msg, type, timeout = 5000) => async dispatch => {
  const id = uuid();
  dispatch({ type: SET_ALERT, payload: { msg, type, id } });

  await new Promise(resolve => setTimeout(resolve, timeout));

  dispatch({ type: REMOVE_ALERT, payload: id });
};
