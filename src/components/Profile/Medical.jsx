import { Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import propTypes from "prop-types";

const Medical = ({ data }) => {
  return (
    <Grid container p={3}>
      <Grid item md={6} p={1}>
        <Typography variant="title2">Diabetic Type</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline">Type {data.category}</Typography>
      </Grid>

      <Grid item md={6} p={1}>
        <Typography variant="title2">Send Monthy Report</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline">Disabled</Typography>
      </Grid>

      <Grid item borderRadius={2} md={12} display="flex" justifyContent="end">
        <IconButton color="error" size="small">
          <Edit />
        </IconButton>
      </Grid>
    </Grid>
  );
};

Medical.propTypes = {
  data: propTypes.object.isRequired,
};
export default Medical;
