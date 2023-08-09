import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types"; // Import PropTypes
import { filterContacts } from "../../store/actions/contacts";

function FilterContacts({ filterContacts }) {
  const textRef = useRef(null);

  const handleChange = () => {
    filterContacts(textRef.current.value);
  };

  return (
    <form>
      <input
        ref={textRef}
        type="text"
        placeholder="Filter contacts..."
        onChange={handleChange}
      />
    </form>
  );
}

FilterContacts.propTypes = {
  filterContacts: PropTypes.func.isRequired // Define the expected prop type
};

export default connect(null, { filterContacts })(FilterContacts);
