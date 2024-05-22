import { TextField } from "@mui/material";
import propTypes from "prop-types";
const AppInput = ({
  type,
  errors,
  label,
  variant,
  name,
  errorMessage,
  control,
}) => {
  return (
    <TextField
      label={label || "Field"}
      variant={variant || "filled"}
      error={Boolean(errors[name]?.message)}
      helperText={errors[name]?.message}
      {...control(name, { required: errorMessage })}
      type={type || "text"}
      fullWidth
      InputLabelProps={{ shrink: true }}
    />
  );
};

AppInput.propTypes = {
  type: propTypes.string,
  errors: propTypes.object.isRequired,
  label: propTypes.string.isRequired,
  variant: propTypes.string,
  name: propTypes.string.isRequired,
  errorMessage: propTypes.string,
  control: propTypes.func.isRequired,
};
export default AppInput;
