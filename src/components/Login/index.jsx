import { Box, Button, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/auth";
import { toast } from "react-toastify";
import AppInput from "../shared/AppInput";

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
      localStorage.setItem("ba-token", data.headers.get("x-session-token"));
      login(data.data.user, data.data.session);
      reset();
      toast.success("Logged in!");
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(error.response.data.error || "Something went wrong"),
  });

  return (
    <Box
      maxWidth="md"
      sx={{
        margin: "auto",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(mutate)} spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Login</Typography>
          <Link to="/register">Register</Link>
        </Stack>
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
        <Button type="submit" variant="outlined">
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
