/* eslint-disable */
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordlessAuth } from "../../services";
import { useAuthStore } from "../../stores/auth";
import { Typography } from "@mui/material";

const EmailAuth = () => {
  const { login } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  const lodRef = useRef(false);
  const navigate = useNavigate();
  const { mutate } = useMutation(["emailAuth"], passwordlessAuth, {
    onSuccess: (data) => {
      toast.success(data.data.success);
      login(data.headers.get("authorization"));
      navigate("/", { replace: true });
    },
    onError: (errors) => toast.error(errors.response.data.error),
  });
  if (!key) {
    toast.error("Invalid request!");
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (!lodRef.current) mutate({ key: key });
    return () => (lodRef.current = true);
  }, [key, mutate]);
  return <Typography variant="title1">Verifying user request....</Typography>;
};

export default EmailAuth;
