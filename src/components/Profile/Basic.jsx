import { Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import propTypes from "prop-types";

const Basic = ({ data }) => {
  return (
    <Grid container p={3}>
      <Grid item md={6} p={1}>
        <Typography variant="title2">Name</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline">{data.name}</Typography>
      </Grid>

      <Grid item md={6} p={1}>
        <Typography variant="title2">Email</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline">{data?.email}</Typography>
      </Grid>
      <Grid item md={6} p={1}>
        <Typography variant="title2">Age</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline">Lorem, ipsum dolor.</Typography>
      </Grid>
      <Grid item md={6} p={1}>
        <Typography variant="title2">DOB</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline" textAlign="end">
          {data.dob}
        </Typography>
      </Grid>
      <Grid item md={6} p={1}>
        <Typography variant="title2">Gender</Typography>
      </Grid>
      <Grid
        item
        md={6}
        p={1}
        sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
      >
        <Typography variant="overline">{data.gender}</Typography>
      </Grid>
      <Grid item borderRadius={2} md={12} display="flex" justifyContent="end">
        <IconButton color="error" size="small">
          <Edit />
        </IconButton>
      </Grid>
    </Grid>
  );
};

Basic.propTypes = {
  data: propTypes.object.isRequired,
};
export default Basic;
