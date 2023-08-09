import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../store/actions/alert";
import { login, clearErrors } from "../../store/actions/auth";

function Login({ setAlert, login, auth, history, clearErrors }) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
    if (auth.error === "Invalid Credentials") {
      setAlert(auth.error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [auth.error, auth.isAuthenticated, history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      login({ email, password });
    }
  };

  const { email, password } = user;

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { setAlert, login, clearErrors })(Login);
