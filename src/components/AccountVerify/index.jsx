import { Box } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userAccountVerify } from "../../services";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AccountVerify = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  if (!searchParams.get("key")) navigate("/", { replace: true });

  const { mutate, isSuccess } = useMutation(
    ["userAccountVerify"],
    userAccountVerify,
    {
      onSuccess: (data) => {
        toast.success(data.data);
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      },
      onError: (errors) => toast.error(errors.response.data),
    }
  );

  useEffect(() => {
    !isSuccess && mutate(searchParams.get("key"));
  }, [searchParams, mutate, isSuccess]);
  return <Box>AccountVerify</Box>;
};

export default AccountVerify;
