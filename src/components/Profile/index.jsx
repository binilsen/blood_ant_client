import { Grid, Paper, Stack, Typography } from "@mui/material";
import Basic from "./Basic";
import Medical from "./Medical";
import { useQuery } from "react-query";
import { userProfile } from "../../services";

const Profile = () => {
  const { data } = useQuery(["loadProfile"], userProfile, {
    select: (data) => data.data,
  });
  return (
    <Stack spacing={2} p={3}>
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
    </Stack>
  );
};
export default Profile;
