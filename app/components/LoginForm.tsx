import { FormEventHandler, useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { login, signUp } from "../api/user";
import { AuthFormType } from "../../types/users";

interface LoginFormProps {
  onSubmit: () => void;
  formType: AuthFormType;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, formType }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const result =
      formType === AuthFormType.LOGIN
        ? await login({
            login: userName,
            password,
          })
        : await signUp({
            login: userName,
            password,
          });

    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage("");
      onSubmit();
    }
  };

  return (
    <Paper
      elevation={0}
      style={{ marginBlock: 20, maxWidth: 400, margin: "auto" }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {formType === AuthFormType.LOGIN ? "Sign In" : "Sign Up"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Login"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(event.target.value);
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
        <Button type="submit" variant="outlined" color="primary" fullWidth>
          {formType === AuthFormType.LOGIN ? "Login" : "Sign Up"}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;
