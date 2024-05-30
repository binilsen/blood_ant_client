import { Box, Button, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/auth";
import { toast } from "react-toastify";
import AppInput from "../shared/AppInput";
import { useState } from "react";
import Passwordless from "./Passwordless";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { mutate } = useMutation(["loginUser"], userLogin, {
    onSuccess: (data) => {
      login(data.headers.get("authorization"));
      reset();
      toast.success("Logged in!");
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(error.response.data.error || "Something went wrong"),
  });

  const [passwordless, setPasswordless] = useState(false);
  return (
    <Box
      maxWidth="md"
      sx={{
        margin: "auto",
        height: "90vh",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Login</Typography>
        <Link to="/register">Register</Link>
      </Stack>
      {passwordless ? (
        <Passwordless />
      ) : (
        <Stack spacing={2} component="form" onSubmit={handleSubmit(mutate)}>
          <AppInput
            label="Email"
            name="email"
            errors={errors}
            control={register}
            errorMessage="Enter a valid email"
            type="email"
          />
          <AppInput
            label="Password"
            type="password"
            errors={errors}
            control={register}
            name="password"
            errorMessage="Enter a valid password"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      )}
      {!passwordless && (
        <Button
          sx={{ mt: 4 }}
          variant="outlined"
          onClick={() => setPasswordless(true)}
        >
          Login with email
        </Button>
      )}
      {passwordless && (
        <Button
          sx={{ mt: 4 }}
          variant="outlined"
          onClick={() => setPasswordless(false)}
        >
          Login with password
        </Button>
      )}
    </Box>
  );
};

export default Login;
