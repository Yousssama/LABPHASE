import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSignInAlt, faPhone } from "@fortawesome/free-solid-svg-icons";


function Navbar({ title, icon, auth, logout }) {
  const onLogout = () => {
    logout();
  };
  const authLink = (
    <React.Fragment>
      <li>Hello {auth.user && auth.user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fa fa-sign-out"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </React.Fragment>
  );

  const guestLink = (
    <React.Fragment>
      <li>
        <Link to="/register"><FontAwesomeIcon icon={faUserPlus} className="nav-icon" />Register</Link>
      </li>
      <li>
        <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />Login</Link>
      </li>
      <li>
          <Link to="/dial">  <FontAwesomeIcon icon={faPhone} className="nav-icon" />Dial</Link>
        </li>
    </React.Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>{auth.isAuthenticated ? authLink : guestLink}</ul>
    </div>
  );
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};
Navbar.defaultProps = {
  title: "Cloud Connect",
  icon: "fa fa-creative-commons"
};
const mapStatesToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStatesToProps, { logout })(Navbar);
