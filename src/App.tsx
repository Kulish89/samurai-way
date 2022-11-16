import React from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import { Login } from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from "./components/Profile/Profile";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />

        <div className="content">
          <Route path="/profile/:userId?" component={withRouter(Profile)} />
          <Route path="/dialogs" render={() => <Dialogs />} />
          <Route path="/users" render={() => <Users />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
