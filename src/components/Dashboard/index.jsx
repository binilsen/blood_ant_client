import { Paper, Stack, Typography } from "@mui/material";
import ReadForm from "../shared/ReadForm";
import { LineChart } from "@mui/x-charts";
const Dashboard = () => {
  return (
    <Stack spacing={1}>
      <ReadForm />
      <div className="graphq">
        <Typography variant="h5">Measurement Histroy</Typography>
        <Paper elevation={8} sx={{ borderRadius: 2 }}>
          <LineChart
            height={500}
            series={[{ data: [null, null, 10, 11, 12] }]}
            xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6] }]}
          />
        </Paper>
      </div>
    </Stack>
  );
};

export default Dashboard;
