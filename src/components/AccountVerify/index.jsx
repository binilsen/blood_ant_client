/* eslint-disable */
import { Box, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userAccountVerify } from "../../services";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import AppLoader from "../shared/AppLoader";

const AccountVerify = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const lodRef = useRef(false);

  const navigate = useNavigate();
  const token = searchParams.get("key");
  if (!searchParams.get("key")) navigate("/", { replace: true });

  const { mutate } = useMutation(["userAccountVerify"], userAccountVerify, {
    onSuccess: (data) => {
      toast.success(data.data.success);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    },
    onError: (errors) => {
      navigate("/login", { replace: true });
      toast.error(errors.response.data.error);
    },
  });

  useEffect(() => {
    if (!lodRef.current) mutate(token);

    return () => (lodRef.current = true);
  }, [lodRef, mutate, token]);
  return <Typography variant="title1">Verifying user account....</Typography>;
};

export default AccountVerify;
