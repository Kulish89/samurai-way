import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import store from "./app/redux-store";
import { Provider } from "react-redux";
import App from "./app/App";
import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#11c5a7",
    },
    secondary: {
      main: "#206F57",
    },
  },
  shape: {
    borderRadius: 18,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
