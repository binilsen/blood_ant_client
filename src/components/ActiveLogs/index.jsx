import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { userActiveLogs } from "../../services";
import dayjs from "dayjs";

const COLORS = {
  normal: "success.light",
  high: "info.light",
  low: "error.light",
};
const ActiveLogs = () => {
  const { data } = useQuery(["loadActiveLogs"], userActiveLogs, {
    select: (data) => data.data,
    refetchOnWindowFocus: false
  });
  return (
    <Stack spacing={2}>
      <Typography textAlign="center" variant="h4">
        Today&apos;s Log
      </Typography>

      <Grid container>
        {data &&
          data.map((log) => (
            <Grid key={log.id} item sm={12} md={6} xs={12} xl={4} p={1}>
              <Card sx={{ bgcolor: COLORS[log.result] }}>
                <CardActionArea>
                  <CardHeader
                    title={
                      <Stack
                        gap={2}
                        direction="row"
                        textTransform="capitalize"
                        alignItems="center"
                      >
                        <Typography fontWeight="bolder" variant="h5">
                          {log.value}
                        </Typography>
                        <Chip label={log.result} color="warning" size="small" />
                      </Stack>
                    }
                  />
                  <CardContent>
                    <Stack
                      gap={2}
                      alignItems="center"
                      textTransform="capitalize"
                      direction="row"
                      color="wheat"
                    >
                      <Typography variant="overline">
                        {dayjs(log.created_at).format(
                          "hh:MM A | dddd MMM YYYY"
                        )}
                      </Typography>
                      <Chip
                        size="small"
                        label={log.session}
                        sx={{ bgcolor: "white", fontWeight: "lighter" }}
                      />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default ActiveLogs;
