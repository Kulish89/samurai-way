import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { StateType } from ".";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

type AppPropsType = {
  state: StateType;
};

function App({ state }: AppPropsType) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Route
            path="/profile"
            component={() => <Profile postsData={state.postsData} />}
          />
          <Route
            path="/dialogs"
            render={() => (
              <Dialogs
                dialogsData={state.dialogsData}
                messagesData={state.messagesData}
              />
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
