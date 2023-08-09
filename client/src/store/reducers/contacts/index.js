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

const initialState = {
  contacts: [],
  filtered: null,
  error: null,
  loading: true,
  selected: {}
};

function contactReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
        error: null // Clear any previous error when fetching contacts
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts], // Add new contact to the beginning
        loading: false,
        error: null // Clear any previous error after adding contact
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false,
        error: null // Clear any previous error after deleting contact
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
        error: null // Clear any previous error after updating contact
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        error: null // Clear any previous error after filtering contacts
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
        error: null // Clear any previous error when setting selected contact
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        selected: {},
        error: null // Clear any previous error after clearing selected contact
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default contactReducer;
