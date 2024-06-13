import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { userActiveLogs } from "../../services";
import dayjs from "dayjs";
import { useState } from "react";
import TodaysLog from "../shared/TodaysLog";

const COLORS = {
  normal: "success.light",
  high: "info.light",
  low: "error.light",
};
const ActiveLogs = () => {
  const [isVisual, setIsVisual] = useState(false);
  const { data } = useQuery(["loadActiveLogs"], userActiveLogs, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        gap={2}
        alignItems="center"
      >
        <Typography textAlign="center" variant="h5">
          Today&apos;s Log
        </Typography>
        <FormControlLabel
          control={
            <Switch
              value={isVisual}
              onChange={() => setIsVisual((prev) => !prev)}
            />
          }
          label="Visualize"
        />
      </Stack>
      {isVisual ? (
        <TodaysLog />
      ) : (
        <Grid container justifyContent="center" my={2}>
          {data && data.length == 0 && (
            <Typography variant="overline">No records found.</Typography>
          )}
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
                          <Typography fontWeight="bolder" variant="h6">
                            {log.value} mg/dL
                          </Typography>
                          <Chip
                            label={log.result}
                            color="warning"
                            size="small"
                          />
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
      )}
    </Stack>
  );
};

export default ActiveLogs;
