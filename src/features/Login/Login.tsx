import React from "react";

import { useFormik } from "formik";
import { login } from "./auth-reducer";
import { useAppDispatch, useAppSelector } from "../../common/hooks/customHooks";
import { Navigate } from "react-router-dom";
import { PATH } from "../../common/components/Routing/Routers";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { loginFormValidation } from "../../common/utils/loginFormValidation";

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const captcha = useAppSelector((state) => state.authReducer.captcha);

  const formik = useFormik({
    validate: (values) => {
      return loginFormValidation(values);
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captchaValue: "",
    },
    onSubmit: (values) => {
      const { email, password, rememberMe, captchaValue } = values;
      dispatch(login(email, password, rememberMe, captchaValue));
    },
  });
  if (isLoggedIn) {
    return <Navigate to={PATH.USERS} />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : (
                <></>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...formik.getFieldProps("rememberMe")}
                checked={formik.values.rememberMe}
              />
              {captcha && (
                <Box>
                  <img src={captcha} alt="" />
                  <TextField
                    label="Symbols from image"
                    margin="normal"
                    fullWidth
                    {...formik.getFieldProps("captchaValue")}
                    onBlur={formik.handleBlur}
                  />
                </Box>
              )}

              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
