type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const loginFormValidation = (values: FormikErrorType) => {
  const errors: FormikErrorType = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password should be more than 4 symbols";
  }
  return errors;
};
