import { ExitToApp } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { userLogout } from "../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(["userLogout"], userLogout, {
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success("Logged out!");
    },
    onError: () => toast.error("Something went wrong"),
  });
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Actions</Typography>
      <hr />
      <Stack direction="row">
        <Button
          variant="contained"
          onClick={mutate}
          color="error"
          endIcon={<ExitToApp />}
        >
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};
export default Logout;
