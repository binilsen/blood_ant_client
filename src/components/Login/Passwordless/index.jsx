import { Button, Stack } from "@mui/material";
import AppInput from "../../shared/AppInput";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { passwordlessRequest } from "../../../services";
import { toast } from "react-toastify";
import { useState } from "react";

const Passwordless = () => {
  const [resend, setResend] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const { mutate } = useMutation(["requestPasswordless"], passwordlessRequest, {
    onSuccess: (data) => toast.success(data.data.success),
    onError: (errors) => toast.error(errors.response.data.error),
  });

  const submitHandler = (data) => {
    mutate(data);
    setResend(false);
    setTimeout(() => {
      setResend(true);
    }, 30000);
  };
  return (
    <Stack
      spacing={2}
      component="form"
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit(submitHandler)}
    >
      <AppInput
        label="Email"
        name="email"
        errors={errors}
        control={register}
        errorMessage="Enter a valid email"
        type="email"
      />

      {resend ? (
        <Button fullWidth type="submit" variant="contained">
          Get Link
        </Button>
      ) : (
        <Button fullWidth type="button" disabled variant="contained">
          Get Link
        </Button>
      )}
    </Stack>
  );
};

export default Passwordless;
