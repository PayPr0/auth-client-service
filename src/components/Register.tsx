import React from "react";
import css from "@/styles/Login.module.scss";
import { TextField, Checkbox, Button, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { useInput, useForm } from "use-manage-form";
import useSnackbarAlert from "@/hooks/useAlert";

const Register = () => {
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
  } = useInput<string>((value) =>
    value
      ? value.trim() !== "" &&
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value as any
        )
      : false
  );

  const {
    value: name,
    isValid: nameIsValid,
    inputIsInValid: nameInputIsInvalid,
    onChange: onNameChange,
    onBlur: onNameBlur,
    reset: resetName,
  } = useInput<string>((value) => (value ? value.trim() !== "" : false));

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    inputIsInValid: phoneNumberInputIsInvalid,
    onChange: onPhoneNumberChange,
    onBlur: onPhoneNumberBlur,
    reset: resetPhoneNumber,
  } = useInput<string>((value) => (value ? value.trim() !== "" : false));

  const {
    executeBlurHandlers,
    reset: resetForm,
    formIsValid,
  } = useForm({
    blurHandlers: [onEmailBlur, onPasswordBlur, onNameBlur, onPhoneNumberBlur],
    resetHandlers: [resetEmail, resetPassword, resetName, resetPhoneNumber],
    validateOptions: () =>
      emailIsValid && passwordIsValid && nameIsValid && phoneNumberIsValid,
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
        <h2 className={css.heading}>Sign up</h2>
        <form onSubmit={submitHandler}>
          <TextField
            id="name"
            label="Name"
            placeholder="E.g. John Doe"
            variant="outlined"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={onNameBlur as any}
            error={nameInputIsInvalid}
            helperText={nameInputIsInvalid && "Input must not be empty"}
          />

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
            id="phone_number"
            label="Phone number"
            placeholder="E.g. +234 8012345678"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            onBlur={onPhoneNumberBlur as any}
            error={phoneNumberInputIsInvalid}
            helperText={phoneNumberInputIsInvalid && "Input must not be empty"}
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
            helperText={
              passwordInputIsInvalid &&
              `Password input should contain at least one uppercase letter,
              lowercase letter, number, special character, and must be at least
              8 characters, but less than 100 characters`
            }
          />
          <label htmlFor="remember">
            <Checkbox id="remember" />
            &nbsp;Remember me
          </label>
          <Button variant="outlined" type="submit" size="large">
            Sign up
          </Button>
        </form>
        <div className={css.sign_up_text}>
          Don't have an account? <Link href="/?auth_mode=login">Sign in</Link>
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
          User created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
