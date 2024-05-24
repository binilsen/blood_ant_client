import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AppInput from "../shared/AppInput";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userDose, userDoseAdd, userDoseEdit } from "../../services";
import { toast } from "react-toastify";
import propTypes from "prop-types";

const ManageDose = ({ id, open, closeHandler }) => {
  const qClient = useQueryClient();
  const {
    register,
    control,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm({ mode: "onChange" });

  const mutation = id ? userDoseEdit : userDoseAdd;
  const doseData = useQuery(["loadUserDose"], () => userDose(id), {
    onSuccess: (data) =>
      reset({
        morning: data.morning,
        afternoon: data.afternoon,
        evening: data.evening,
        night: data.night,
        remarks: data.remarks,
        medicine: data.medicine,
        status: data.status,
      }),
    select: (data) => data.data,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation(["addUserDose"], mutation, {
    onSuccess: () => {
      toast.success("Dose updated!");
      closeHandler();
      qClient.invalidateQueries(["loadDoses"]);
      qClient.invalidateQueries(["userActiveDose"]);
      reset();
    },
    onError: (error) => toast.error(error.response.data[0]),
  });

  const submitHandler = (data) =>
    id ? mutate({ id: id, data: data }) : mutate(data);

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle>Edit Dose</DialogTitle>
        <DialogContent>
          {doseData.data && (
            <Stack spacing={3}>
              <AppInput
                label="Morning"
                control={register}
                name="morning"
                errors={errors}
              />
              <AppInput
                label="Afternoon"
                control={register}
                name="afternoon"
                errors={errors}
              />
              <AppInput
                label="Evening"
                control={register}
                name="evening"
                errors={errors}
              />
              <AppInput
                label="Night"
                control={register}
                name="night"
                errors={errors}
              />
              <AppInput
                label="Medicine"
                control={register}
                name="medicine"
                errors={errors}
              />

              <AppInput
                label="Remarks"
                control={register}
                name="remarks"
                errors={errors}
              />

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select size="small" {...field} fullWidth>
                    <MenuItem value={"active"}>
                      <Typography variant="overline">Active</Typography>
                    </MenuItem>
                    <MenuItem value={"inactive"}>
                      <Typography variant="overline">Inactive</Typography>
                    </MenuItem>
                  </Select>
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

ManageDose.propTypes = {
  id: propTypes.number,
  open: propTypes.bool.isRequired,
  closeHandler: propTypes.func.isRequired,
};
export default ManageDose;
