import { Stack } from "@mui/material";
import ReadForm from "../shared/ReadForm";
import ActiveLogs from "../ActiveLogs";
const Dashboard = () => {
  return (
    <Stack spacing={5} p={3}>
      <ReadForm />
     <ActiveLogs/>
    </Stack>
  );
};

export default Dashboard;
