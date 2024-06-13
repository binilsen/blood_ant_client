import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { loadFilters, userLogDelete, userLogs } from "../../services";
import { Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useState } from "react";
import LogChart from "../shared/LogChart";
import EditLog from "../EditLog";

const Logs = () => {
  const appFilters = useQuery(["loadFilters"], loadFilters, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const [editLogId, setEditLogId] = useState();

  const [params, setParams] = useState({
    session: "",
    result: "",
    tag: "",
    page: 1,
  });
  const { data, refetch } = useQuery(
    ["userLogs", params],
    () => userLogs({ params: params }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteLog = useMutation(["deleteLog"], userLogDelete, {
    onSuccess: () => {
      toast.success("Log deleted!");
      refetch();
    },
  });

  const handleParams = (val, item) =>
    setParams((prev) => {
      return { ...prev, [item]: val };
    });

  const formatDate = (date) => dayjs(date).format("hh:MM A | dddd MMM YYYY");

  const handlePageChange = (event, val) =>
    setParams((prev) => {
      return { ...prev, page: parseInt(val, 10) + 1 };
    });

  const closeHandler = () => {
    setEditLogId(null);
  };

  return (
    <>
      <Typography variant="h5">Recent Logs</Typography>
      {appFilters.data && (
        <Grid container gap={1} p={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={4}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Session</InputLabel>
              <Select
                sx={{ textTransform: "capitalize" }}
                value={params.session}
                onChange={(e) => handleParams(e.target.value, "session")}
                label="Session"
                fullWidth
                variant="filled"
              >
                <MenuItem value="">Select a session</MenuItem>
                {appFilters.data?.sessions.map((session, index) => (
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
          <Grid item xs={12} sm={12} md={4}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Bookmark</InputLabel>
              <Select
                sx={{ textTransform: "capitalize" }}
                label="Tag"
                value={params.tag}
                onChange={(e) => handleParams(e.target.value, "tag")}
                fullWidth
                variant="filled"
              >
                <MenuItem value="">Select a tag</MenuItem>
                {appFilters.data?.tags.map((session, index) => (
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
          <Grid item xs={12} sm={12} md={3}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Result</InputLabel>
              <Select
                value={params.result}
                label="Session"
                fullWidth
                sx={{ textTransform: "capitalize" }}
                onChange={(e) => handleParams(e.target.value, "result")}
                variant="filled"
              >
                <MenuItem value="">Select a result type</MenuItem>
                {appFilters.data?.results.map((session, index) => (
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
        </Grid>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ bgcolor: "info.light", color: "wheat" }}>
            <TableRow>
              <TableCell>Observation</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="right">Session</TableCell>
              <TableCell align="right">Remarks</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((log) => (
              <TableRow
                key={log.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  textTransform: "capitalize",
                }}
              >
                <TableCell component="th" scope="row">
                  {log.result}
                </TableCell>
                <TableCell component="th" scope="row">
                  {log.value} mg/dL
                </TableCell>
                <TableCell align="right">{log.session}</TableCell>
                <TableCell align="right">{log.remark || "N/A"}</TableCell>

                <TableCell align="right">{log.tag}</TableCell>
                <TableCell align="right">
                  {formatDate(log.created_at)}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="end">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteLog.mutate(log.id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setEditLogId(log.id)}
                    >
                      <Edit />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {data && (
                <TablePagination
                  rowsPerPageOptions={[]}
                  rowsPerPage={parseInt(data.headers.get("page-items"))}
                  count={parseInt(data.headers.get("total-count"))}
                  page={params.page - 1}
                  onPageChange={handlePageChange}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <hr />
      <LogChart />
      <EditLog
        open={Boolean(editLogId)}
        closeHandler={closeHandler}
        id={editLogId}
      />
    </>
  );
};

export default Logs;
