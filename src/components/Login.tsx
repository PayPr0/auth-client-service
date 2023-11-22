import React, { useReducer } from "react";
import css from "@/styles/Login.module.scss";
import { TextField, Checkbox, Button, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { useInput, useForm } from "use-manage-form";
import useSnackbarAlert from "@/hooks/useAlert";

const Login = () => {
  const { displayState, triggerDisplay, triggerClose } = useSnackbarAlert({
    duration: 6000,
  });
  const {
    value: email,
    isValid: emailIsValid,
    inputIsInValid: emailInputIsInvalid,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: resetEmail,
  } = useInput<string>((value) =>
    value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as any) : false
  );
  const {
    value: password,
    isValid: passwordIsValid,
    inputIsInValid: passwordInputIsInvalid,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    reset: resetPassword,
  } = useInput<string>((value) => (value ? value.trim() !== "" : false));

  const {
    executeBlurHandlers,
    reset: resetForm,
    formIsValid,
  } = useForm({
    blurHandlers: [onEmailBlur, onPasswordBlur],
    resetHandlers: [resetEmail, resetPassword],
    validateOptions: () => emailIsValid && passwordIsValid,
  });

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formIsValid) return executeBlurHandlers();

    triggerDisplay();
    resetForm();
  };

  return (
    <>
      <div className={css.login}>
        <h2 className={css.heading}>Sign in</h2>
        <form onSubmit={submitHandler}>
          <TextField
            id="email"
            label="Email"
            placeholder="E.g. johndoe@gmail.com"
            variant="outlined"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={onEmailBlur as any}
            error={emailInputIsInvalid}
            helperText={
              emailInputIsInvalid && "Please enter a valid email address"
            }
          />
          <TextField
            id="password"
            label="Password"
            placeholder="E.g. J0hn_D03"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onBlur={onPasswordBlur as any}
            error={passwordInputIsInvalid}
            helperText={passwordInputIsInvalid && "Input must not be empty"}
          />
          <label htmlFor="remember">
            <Checkbox id="remember" />
            &nbsp;Remember me
          </label>
          <Button variant="outlined" type="submit" size="large">
            Sign in
          </Button>
        </form>
        <div className={css.sign_up_text}>
          Don't have an account? <Link href="?auth_mode=signup">Sign up</Link>
        </div>
      </div>
      <Snackbar
        open={displayState}
        autoHideDuration={6000}
        onClose={triggerClose as any}
      >
        <Alert
          onClose={triggerClose as any}
          severity="success"
          sx={{ width: "100%" }}
        >
          User logged in successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
