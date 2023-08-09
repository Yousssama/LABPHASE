import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getContacts, deleteContact, setSelected } from "../../store/actions/contacts";

function Contacts({ contacts, getContacts, deleteContact, setSelected }) {
  useEffect(() => {
    // Fetch initial contacts when the component mounts
    getContacts();
  }, [getContacts]);

  const onDelete = id => {
    deleteContact(id);
  };

  const onEdit = contact => {
    setSelected(contact);
  };

  const contactItems = contacts.filtered !== null
    ? Array.isArray(contacts.filtered)
      ? contacts.filtered
      : []
    : Array.isArray(contacts.contacts)
      ? contacts.contacts
      : [];

  return (
    <React.Fragment>
      <TransitionGroup>
        {contactItems.length > 0 ? (
          contactItems.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem
                contact={contact}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </CSSTransition>
          ))
        ) : (
          <p>Please add a contact</p>
        )}
      </TransitionGroup>
    </React.Fragment>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.object.isRequired,
  getContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { contacts: state.contacts };
};

export default connect(mapStateToProps, {
  getContacts,
  deleteContact,
  setSelected
})(Contacts);
