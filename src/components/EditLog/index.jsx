import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AppInput from "../shared/AppInput";
import { Controller, useForm } from "react-hook-form";
import AppSelect from "../shared/AppSelect";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { loadFilters, userLog, userLogUpdate } from "../../services";
import { toast } from "react-toastify";
import propTypes from "prop-types";

const EditLog = ({ id, open, closeHandler }) => {
  const qClient = useQueryClient();
  const {
    register,
    control,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm({ mode: "onChange" });

  const logFilters = useQuery(["loadFilters"], loadFilters, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const logData = useQuery(["loadLog"], () => userLog(id), {
    onSuccess: (data) =>
      reset({
        value: data.value,
        remark: data.remark,
        session: data.session,
        tag: data.tag,
      }),
    select: (data) => data.data,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation(["editLog"], userLogUpdate, {
    onSuccess: () => {
      toast.success("Log updated!");
      closeHandler();
      qClient.invalidateQueries(["userLogs"]);
      reset();
    },
    onError: (error) => toast.error(error.response.data[0]),
  });

  const submitHandler = (data) => mutate({ id: id, data: data });

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle>Edit Log</DialogTitle>
        <DialogContent>
          {logData.data && (
            <Stack spacing={3}>
              <AppInput
                label="Value"
                control={register}
                name="value"
                errors={errors}
              />
              {logFilters.data && (
                <AppSelect
                  data={logFilters?.data?.sessions}
                  controls={control}
                  label="Session"
                  name={"session"}
                />
              )}

              <TextField
                variant="filled"
                label="Remark"
                {...register("remark")}
                fullWidth
              />
              <Controller
                control={control}
                name="tag"
                render={({ field }) => (
                  <ToggleButtonGroup size="small" {...field} fullWidth>
                    {logFilters?.data?.tags.map((item, index) => (
                      <ToggleButton key={index} value={item}>
                        <Typography variant="overline">{item}</Typography>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={closeHandler}>
            Close
          </Button>
          <Button autoFocus variant="contained" type="submit" size="small">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

EditLog.propTypes = {
  id: propTypes.number.isRequired,
  open: propTypes.bool.isRequired,
  closeHandler: propTypes.func.isRequired,
};
export default EditLog;
