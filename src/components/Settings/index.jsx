import { BarChart } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { userReportGenerate } from "../../services";
import { toast } from "react-toastify";

const Settings = () => {
  const [month, setMonth] = useState(3);
  const { mutate } = useMutation(["userReportGenerate"], userReportGenerate, {
    onSuccess: (data) => toast.success(data.data),
  });
  const submitHandler = () => mutate({ params: { month: month } });

  return (
    <Stack spacing={3} p={3}>
      <Box>
        <Typography variant="h5">Generate Reports</Typography>
        <hr />
        <Grid container gap={1} my={2} alignItems={"center"}>
          <Grid item xs={12} sm={12} md={5}>
            <ToggleButtonGroup
              value={month}
              size="small"
              exclusive
              onChange={(e, val) => setMonth(val)}
              fullWidth
            >
              <ToggleButton value={3}>3 Month</ToggleButton>
              <ToggleButton value={6}>6 Month</ToggleButton>
              <ToggleButton value={9}>9 Month</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={5} textAlign="center">
            <Button
              onClick={submitHandler}
              variant="contained"
              endIcon={<BarChart />}
            >
              Generate
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Settings;
