import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { axiosWithAuth } from "./utils/axiosWithAuth";

function App(props) {
  const [credentials, setCredentials] = useState("");

  const handleChange = (e, setter) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    //this is just to log our changes
    console.log(credentials);
  }, [credentials]);

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth
      .post("http://localhost:3300/api/auth/login", credentials)
      .then((res) => {
        console.log("Login successful", res);
        localStorage.setItem("token", res.data.payload.token);
        localStorage.setItem("username", res.data.payload.username);
        console.log(res.data.payload.token, res.data.payload.username);
      })
      .catch((err) => console.error("There was an error, sorry. ", err));

    axiosWithAuth
      .get("http://localhost:3300/api/jokes", credentials)
      .then((res) => {
        console.log("Login successful", res);
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>THE REAL QUESTION HERE IS WHETHER OR NOT YOU DESERVE JOKES.</h1>
        <h3>PROVE TO ME THAT YOU ARE A TRUE DAD BY LOGGING IN</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <form className="loginForm" onSubmit={login}>
          Username <br />
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          Password <br />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />
          <br />
          <div className="buttonsContainer">
            <button type="submit" variant="primary">
              Log in
            </button>
            {/* <Link to="/sign-up">
              <button onClick={(e) => {}} variant="secondary">
                Sign Up
              </button>
            </Link> */}
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
