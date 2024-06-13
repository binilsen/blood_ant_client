import { useState } from "react";
import { userActiveLogs } from "../../../services";
import { useQuery } from "react-query";
import { map } from "lodash";
import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const TodaysLog = () => {
  const [chartData, setChartDate] = useState({
    sessions: [],
    values: [],
  });

  const { data } = useQuery(["loadChart"], userActiveLogs, {
    refetchOnWindowFocus: false,
    select: (data) => data.data,
    onSuccess: (data) =>
      setChartDate({
        sessions: map(data, "session"),
        values: map(data, "value"),
      }),
  });

  return (
    <Box>
      <Typography variant="h5">Measurement History</Typography>
      <Paper elevation={8} sx={{ borderRadius: 2 }}>
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
              xAxis={[{ scaleType: "band", data: chartData.sessions }]}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default TodaysLog;
