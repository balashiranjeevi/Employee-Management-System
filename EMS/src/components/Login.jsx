import React from "react";
import './style.css';


const Login = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 loginPage">
      <div className="p3 rounded w-25 border loginForm">
        <h2>Login page</h2>
        <form>
          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter E-mail"
              className="form-control rounded-0"
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              required
            />
          </div>
          <button className="btn btn-success w-100 rounded-0">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
