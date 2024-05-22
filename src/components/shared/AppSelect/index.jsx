import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const AppSelect = ({ label, data, controls, name }) => {
  return (
    <Controller
      control={controls}
      name={name || label}
      render={({ field }) => (
        <FormControl fullWidth variant="filled">
          <InputLabel>{label}</InputLabel>
          <Select fullWidth
            {...field}
            sx={{ textTransform: "capitalize" }}
            label={label || "Select"}
          >
            {data &&
              data.map((item, index) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

AppSelect.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  controls: PropTypes.object.isRequired,
  name: PropTypes.string,
};
export default AppSelect;
