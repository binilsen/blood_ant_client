import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { userActiveDose } from "../../../services";
import { Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import ManageDose from "../../ManageDose";
import { useState } from "react";

const Dose = () => {
  const { data } = useQuery(["userDose"], userActiveDose, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  console.log(data);
  return (
    <Stack>
      {data && (
        <Grid container p={3}>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Medication</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">{data.medicine || "N/A"}</Typography>
          </Grid>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Morning Dose</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">{data.morning || "N/A"}</Typography>
          </Grid>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Afternoon Dose</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">
              {data.afternoon || "N/A"}
            </Typography>
          </Grid>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Evening Dose</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">{data.evening || "N/A"}</Typography>
          </Grid>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Night Dose</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">{data.night || "N/A"}</Typography>
          </Grid>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Remark</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">{data.remarks || "N/A"}</Typography>
          </Grid>
          <Grid item md={6} p={1}>
            <Typography variant="title2">Dated</Typography>
          </Grid>
          <Grid
            item
            md={6}
            p={1}
            sx={{ display: "flex", justifyContent: { md: "end", sm: "start" } }}
          >
            <Typography variant="overline">
              {dayjs(data.created_at).format("DD MMM YYYY") || "N/A"}
            </Typography>
          </Grid>
          <Grid
            item
            borderRadius={2}
            md={12}
            display="flex"
            justifyContent="end"
          >
            <IconButton
              onClick={() => setOpen(true)}
              color="error"
              size="small"
            >
              <Edit />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {data && (
        <ManageDose id={data.id} open={open} closeHandler={handleClose} />
      )}
    </Stack>
  );
};

export default Dose;
