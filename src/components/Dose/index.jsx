import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { userActiveDose } from "../../services";
import { Edit } from "@mui/icons-material";
import Doses from "../shared/Doses";
import ManageDose from "../ManageDose";
import { useState } from "react";

const Dose = () => {
  const activeDose = useQuery(["userActiveDose"], userActiveDose, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const [open, setOpen] = useState(false);
  const closeHandler = () => setOpen(false);
  return (
    <>
      <Card sx={{ bgcolor: "primary.light", color: "wheat" }}>
        <CardActionArea>
          <CardHeader
            title={
              <Typography
                variant="h5"
                fontWeight="bold"
                borderBottom={1}
                textTransform={"uppercase"}
              >
                Active
              </Typography>
            }
          />
          <CardContent>
            {activeDose.data && (
              <Stack spacing={3}>
                <Typography variant="h6" fontWeight="bold">
                  Medication: {activeDose.data.medicine || "N/A"}
                </Typography>
                <Stack
                  gap={2}
                  sx={{ flexDirection: { xs: "column", md: "row" } }}
                >
                  <Chip
                    color="warning"
                    label={
                      <Typography variant="overline">
                        Morning: {activeDose.data.morning} unit
                      </Typography>
                    }
                  />
                  <Chip
                    color="warning"
                    label={
                      <Typography variant="overline">
                        Afternoon: {activeDose.data.afternoon} unit
                      </Typography>
                    }
                  />{" "}
                  <Chip
                    color="warning"
                    label={
                      <Typography variant="overline">
                        Evening: {activeDose.data.evening} unit
                      </Typography>
                    }
                  />
                  <Chip
                    color="warning"
                    label={
                      <Typography variant="overline">
                        Night: {activeDose.data.night} unit
                      </Typography>
                    }
                  />
                  <Chip
                    color="warning"
                    label={
                      <Typography variant="overline">
                        Late Night: {activeDose.data.late_night} unit
                      </Typography>
                    }
                  />
                </Stack>
              </Stack>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ bgcolor: "white" }}>
          <Button
            startIcon={<Edit />}
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      <Doses />
      {activeDose.data && (
        <ManageDose
          id={activeDose.data.id}
          open={open}
          closeHandler={closeHandler}
        />
      )}
    </>
  );
};

export default Dose;
