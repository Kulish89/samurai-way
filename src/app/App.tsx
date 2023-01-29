import { CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";
import { AppRoutes } from "../common/components/Routing/Routers";
import { useAppDispatch, useAppSelector } from "../common/hooks/customHooks";
import Header from "../features/Header/Header";
import Navbar from "../features/Navbar/Navbar";
import { initializeApp } from "./app-reducer";
import "./App.css";

function App() {
  const isInitialized = useAppSelector(
    (state) => state.appReducer.isInitialized
  );
  const appStatus = useAppSelector((state) => state.appReducer.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return !isInitialized ? (
    <CircularProgress
      size={"50px"}
      sx={{ position: "absolute", top: "45%", left: "50%" }}
    />
  ) : (
    <div className="app-wrapper">
      <ErrorSnackbar />
      {appStatus === "loading" && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: "60px",
            width: "100%",
            height: "8px",
            maxWidth: "1280px",
          }}
        />
      )}
      <Header />
      <Navbar />
      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
