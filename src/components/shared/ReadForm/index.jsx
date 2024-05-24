import { Save } from "@mui/icons-material";
import {
  Fab,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AppSelect from "../AppSelect";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { loadFilters, userLogAdd } from "../../../services";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppInput from "../AppInput";

const VALIDATOR = yup.object({
  value: yup
    .number()
    .typeError("Enter a valid value.")
    .required("Enter a valid value.")
    .min(50, "Enter a valid value.")
    .max(1000, "Enter a valid value."),
});
const ReadForm = () => {
  const qClient = useQueryClient();

  const { data } = useQuery(["loadFilters"], loadFilters, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      value: 0,
      session: "immediate",
      tag: "default",
    },
    resolver: yupResolver(VALIDATOR),
  });

  const { mutate } = useMutation(["addLog"], userLogAdd, {
    onSuccess: () => {
      toast.success("Log updated!");
      qClient.invalidateQueries(["loadChart"]);
      qClient.invalidateQueries(["loadActiveLogs"]);
      reset();
    },
    onError: (errors) => toast.error(errors.response.data[0]),
  });

  return (
    <form onSubmit={handleSubmit(mutate)}>
      <Grid container borderBottom={1}>
        <Grid item sm={12} md={6} p={1}>
          <AppInput
            label="Value"
            control={register}
            name="value"
            errors={errors}
          />
        </Grid>
        <Grid item sm={12} md={6} p={1}>
          {data && (
            <AppSelect
              data={data?.sessions}
              controls={control}
              label="Session"
              name={"session"}
            />
          )}{" "}
        </Grid>

        <Grid item sm={12} md={12} p={1}>
          <TextField
            variant="filled"
            label="Remark"
            {...register("remark")}
            fullWidth
          />
        </Grid>
        <Grid item sm={12} md={12} p={1}>
          <Controller
            control={control}
            name="tag"
            render={({ field }) => (
              <ToggleButtonGroup size="small" {...field} fullWidth>
                {data?.tags.map((item, index) => (
                  <ToggleButton key={index} value={item}>
                    <Typography variant="overline">{item}</Typography>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
        </Grid>
        <Grid item md={12} sm={12} textAlign="center" p={1}>
          <Fab variant="extended" color="error" size="large" type="submit">
            <Save sx={{ mr: 1 }} />
            Save
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReadForm;
