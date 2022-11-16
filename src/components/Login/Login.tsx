import React from "react";
import { reduxForm } from "redux-form";

import { connect } from "react-redux";

import { Redirect } from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css";

// const LoginForm = ({ handleSubmit, error, captchaUrl }: any) => {
//   return (
//     // прокидываем в форму хэндлсабмит, чтобы не перегружалась страница
//     <form onSubmit={handleSubmit}>
//       {/* тег form обязателен для формы, обрамлять им обязательно!!!!!!! */}

//       {createField("Email", Input, [requiredField], "email")}

//       {createField("Password", Input, [requiredField], "password", {
//         type: "password",
//       })}

//       {createField(
//         null,
//         Input,
//         [],
//         "rememberMe",
//         {
//           type: "checkbox",
//         },
//         "remember me"
//       )}
//       {captchaUrl && <img src={captchaUrl} />}
//       {captchaUrl &&
//         createField("Symbols from image", Input, [requiredField], "captcha")}
//       {error && <div className={classes.formError}> {error}</div>}
//       <div>
//         <button>login</button>
//         {/* кнопка в форме автоматом сабмитит форму и страница перегружается */}
//       </div>
//     </form>
//   );
// };

// // оборачиваем форму в контейнерную компоненту HOC
// const LoginReduxForm = reduxForm({
//   form: "login",
// })(LoginForm);

// const Login = (props) => {
//   const onSubmit = (formData) => {
//     props.login(
//       formData.email,
//       formData.password,
//       formData.rememberMe,
//       formData.captcha
//     );
//   };
//   if (props.isAuth) {
//     return <Redirect to={"/profile"} />;
//   }
//   return (
//     <div>
//       <h1>LOGIN</h1>
//       <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     captchaUrl: state.auth.captchaUrl,
//     isAuth: state.auth.isAuth,
//   };
// };
// export default connect(mapStateToProps, { login })(Login);

export const Login = () => {
  return <h1>LOGIN</h1>;
};
