import {
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  Typography,
  Paper,
  IconButton,
  TableFooter,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { userDoseDelete, userDoses } from "../../../services";
import { Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import ManageDose from "../../ManageDose";
import { toast } from "react-toastify";

const Doses = () => {
  const { data, refetch } = useQuery(["loadDoses"], userDoses, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation(["userDoseDelete"], userDoseDelete, {
    onSuccess: () => {
      toast.success("Dose Deleted!");
      refetch()
    },
  });
  const [editDoseId, setEditDoseId] = useState();
  const formatDate = (date) => dayjs(date).format("dddd MMM YYYY");

  const handleClose = () => setEditDoseId();
  const deleteDose = (id) => mutate(id);
  return (
    <Stack spacing={3} p={3}>
      <Typography variant="h5">Recent Doses</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ bgcolor: "info.light", color: "wheat" }}>
            <TableRow>
              <TableCell align="right">Morning</TableCell>
              <TableCell align="right">Afternoon</TableCell>
              <TableCell align="right">Evening</TableCell>
              <TableCell align="right">Night</TableCell>
              <TableCell align="right">Remark</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((dose) => (
              <TableRow
                key={dose.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textTransform: "capitalize",
                }}
              >
                <TableCell align="right">{dose.morning} unit</TableCell>
                <TableCell align="right">{dose.afternoon} unit</TableCell>
                <TableCell align="right">{dose.evening} unit</TableCell>{" "}
                <TableCell align="right">{dose.night} unit</TableCell>
                <TableCell align="right">{dose.remarks || "N/A"}</TableCell>
                <TableCell align="right">{dose.status}</TableCell>
                <TableCell align="right">
                  {formatDate(dose.created_at)}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="end">
                    <IconButton
                      onClick={() => deleteDose(dose.id)}
                      size="small"
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setEditDoseId(dose.id)}
                      color="error"
                    >
                      <Edit />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ManageDose
        open={Boolean(editDoseId)}
        closeHandler={handleClose}
        id={editDoseId}
      />
    </Stack>
  );
};

export default Doses;
