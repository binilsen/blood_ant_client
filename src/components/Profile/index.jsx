import { Grid, Paper, Typography } from "@mui/material";
import Basic from "./Basic";
import Medical from "./Medical";
import { useQuery } from "react-query";
import { userProfile } from "../../services";
import Dose from "./Dose";

const Profile = () => {
  const { data } = useQuery(["loadProfile"], userProfile, {
    select: (data) => data.data,
    refetchOnWindowFocus: false
  });
  return (
    <>
      <Typography variant="title1">Insulin Dose</Typography>
      <hr />
      <Grid container>
        <Grid item md={6} p={1}>
          <Paper elevation={4}>{data && <Dose />}</Paper>
        </Grid>
      </Grid>
      <Typography variant="title1">Basic Info</Typography>
      <hr />
      <Grid container>
        <Grid item md={6} p={1}>
          <Paper elevation={4}>{data && <Basic data={data.user} />}</Paper>
        </Grid>
      </Grid>
      <Typography variant="title1">Medical</Typography>
      <hr />
      <Grid container>
        <Grid item md={6} p={1}>
          <Paper elevation={4}>{data && <Medical data={data.user} />}</Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default Profile;
