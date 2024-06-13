import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useQuery } from "react-query";
import { loadFilters, userLogs } from "../../../services";
import { useState } from "react";
import { map } from "lodash";
import dayjs from "dayjs";

const MONTHS = ["3", "6", "9"];
const LogChart = () => {
  const appFilters = useQuery(["loadFilters"], loadFilters, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const [chartData, setChartDate] = useState({
    dates: [],
    values: [],
  });
  const [params, setParams] = useState({
    session: "",
    month: "3",
    all: true,
  });

  const handleParams = (val, type) =>
    setParams((prev) => {
      return { ...prev, [type]: val };
    });

  const { data } = useQuery(
    ["loadChart", params],
    () => userLogs({ params: params }),
    {
      refetchOnWindowFocus: false,
      select: (data) => data.data,
      onSuccess: (data) =>
        setChartDate({
          dates: map(data, (item) =>
            dayjs(item.created_at).format("DD MMM hh:mm a")
          ),
          values: map(data, "value"),
        }),
    }
  );

  return (
    <Box>
      <Typography variant="h5">Measurement History</Typography>
      <Paper elevation={8} sx={{ borderRadius: 2 }}>
        <Grid
          component={Paper}
          elevation={7}
          alignItems="center"
          container
          p={2}
        >
          <Grid item xs={12} sm={12} md={6} px={2}>
            <FormControl full size="small" variant="filled" fullWidth>
              <InputLabel>Session</InputLabel>
              <Select
                onChange={(e) => handleParams(e.target.value, "session")}
                value={params.session}
                sx={{ textTransform: "capitalize" }}
              >
                <MenuItem value="">Select a session</MenuItem>
                {appFilters.data &&
                  appFilters.data.sessions.map((session, index) => (
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={session}
                      key={index}
                    >
                      {session}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} p={2} textAlign="center">
            <ToggleButtonGroup
              exclusive
              value={params.month}
              onChange={(e) => handleParams(e.target.value, "month")}
              fullWidth
            >
              {MONTHS.map((month, index) => (
                <ToggleButton key={index} value={month}>
                  {month} M
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        {data && (
          <Box
            sx={{ mt: 4 }}
            height={400}
            width="90%"
            textAlign="center"
            margin="auto"
          >
            <LineChart
              series={[{ data: chartData.values, label: "mg/dL " }]}
              xAxis={[{ scaleType: "point", data: chartData.dates }]}
            />
          </Box>
        )}
        <Stack p={2} direction="row" justifyContent="center">
          {params.session.length != 0 && (
            <Chip
              label={
                <Typography
                  variant="overline"
                  fontWeight="bolder"
                  color="primary"
                >
                  Session: {params.session}
                </Typography>
              }
            />
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default LogChart;
