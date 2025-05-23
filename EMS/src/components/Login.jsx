import React, { useState } from "react";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/adminlogin", values)
      .then(result => {
        if (result.data.loginStatus){
          navigate("/dashboard");
        }else{
          setError(result.data.Error);
        }
        

      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 loginPage">
      <div className="p3 rounded w-25 border loginForm">
        <div className="text-warning">
          {error && error}
        </div>
        <h2>Login page</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setValues({ ...values, email: e.target.value })}
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
              onChange={(e) => setValues({ ...values, password: e.target.value })}
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
