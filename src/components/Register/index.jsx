import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AppSelect from "../shared/AppSelect";
import { useMutation } from "react-query";
import { userRegister } from "../../services";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppInput from "../shared/AppInput";

const GENDER = ["male", "female", "other"];
const TYPE = ["one", "two"];

const VALIDATOR = yup.object({
  email: yup
    .string()
    .required("Enter a valid email.")
    .email("Enter a valid email."),
  name: yup
    .string()
    .required("Enter a valid name.")
    .min(5, "Enter a valid name."),
  dob: yup
    .date("Enter a valid dob")
    .typeError("Select a valid dob")
    .required("Enter a valid ob."),
  password: yup
    .string()
    .required("Enter a valid password.")
    .min(8, "Atleast 8 character required."),
  password_confirmation: yup
    .string()
    .required("Password does not match")
    .oneOf([yup.ref("password")], "Password does not match."),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      gender: "male",
      category: "one",
    },
    resolver: yupResolver(VALIDATOR),
  });

  const { mutate } = useMutation(["registerUser"], userRegister, {
    onSuccess: () => {
      reset();
      navigate("/login", { replace: true });
    },
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
          <Typography variant="h4">Register</Typography>
          <Link to="/login">Login</Link>
        </Stack>
        <AppInput
          label="Email"
          control={register}
          name="email"
          errors={errors}
        />
        <AppInput label="Name" control={register} name="name" errors={errors} />
        <AppSelect
          label="Gender"
          controls={control}
          name="gender"
          data={GENDER}
        />
        <AppSelect
          label="Diabetic Type"
          controls={control}
          name="category"
          data={TYPE}
        />
        <AppInput
          type="date"
          label="DOB"
          control={register}
          name="dob"
          errors={errors}
        />
        <AppInput
          label="Password"
          type="password"
          control={register}
          name="password"
          errors={errors}
        />
        <AppInput
          label="Confim Password"
          control={register}
          name="password_confirmation"
          errors={errors}
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;
