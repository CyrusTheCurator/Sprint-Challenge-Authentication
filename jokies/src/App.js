import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import axios from "axios";

function App(props) {
  const [credentials, setCredentials] = useState("");
  const [jokes, setJokes] = useState([]);
  const handleChange = (e, setter) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3300/api/jokes", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("you retrieved a jokeee successful", res);

        setJokes([...res.data]);
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  }, []);

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3300/api/auth/login", credentials)
      .then((res) => {
        console.log("Login successful", res);
        localStorage.setItem("token", "bearer " + res.data.token);
        localStorage.setItem("username", res.data.username);
        window.location.reload(false);
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
            {jokes.length > 1 ? (
              <h4>I guess you are a dad after all... Here's your jokes.</h4>
            ) : (
              <h6>I don't see any dads here.</h6>
            )}
            {jokes.map((joke) => {
              return <div className="jokeCard">{joke.joke}</div>;
            })}
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
