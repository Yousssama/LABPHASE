import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addContact,
  updateContact,
  clearSelected
} from "../../store/actions/contacts";

const initialState = {
  name: "",
  email: "",
  phone: "",
  type: "personal"
};

function ContactForm({
  selected,
  addContact,
  updateContact,
  clearSelected
}) {
  const [contact, setContact] = useState(initialState);

  const { name, email, phone, type } = contact;

  const onChange = e => {
    const { name, value } = e.target;
    setContact(prevContact => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (contact._id) {
      updateContact(contact);
      clearSelected();
    } else {
      addContact(contact);
    }
    setContact(initialState); // Clear the form fields after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">
        {contact._id ? "Update Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <label>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />
        Personal
      </label>{" "}
      <label>
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />
        Professional
      </label>{" "}
      <div>
        <input
          type="submit"
          value={contact._id ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
        {contact._id && (
          <input
            type="button"
            value="Clear"
            className="btn btn-light btn-block"
            onClick={clearSelected}
          />
        )}
      </div>
    </form>
  );
}

const mapStateToProps = state => {
  return { selected: state.contacts.selected };
};

export default connect(mapStateToProps, {
  addContact,
  updateContact,
  clearSelected
})(ContactForm);
