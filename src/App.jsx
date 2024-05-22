import "./App.css";
import { History, Home, Logout, Person, Settings } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "./components/shared/Tab";
import { useState } from "react";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { useAuthStore } from "./stores/auth";
import { useQuery } from "react-query";
import { userProfile } from "./services";
import AppLogout from "./components/Logout";
import { useNavigate } from "react-router-dom";
import Logs from "./components/Logs";

function App() {
  const [value, setValue] = useState(
    parseInt(localStorage.getItem("ba-active-tab")) || 0
  );
  const navigate = useNavigate();
  const { isLogged, login, logout } = useAuthStore();

  const { isLoading } = useQuery(["loadProfile"], userProfile, {
    onSuccess: (data) => login(data.user, data.session),
    onError: () => {
      logout();
      navigate("/login", { replace: true });
    },
    retry: false,
    select: (data) => data.data,
    enabled: !isLogged,
  });

  const handleChange = (event, val) => {
    if (val != 4) localStorage.setItem("ba-active-tab", val);
    setValue(val);
  };
  return (
    <Box>
      <Stack
        sx={{
          borderRadius: 4,
          padding: 4,
          bgcolor: "steelblue",
          color: "wheat",
        }}
        direction="row"
        justifyContent="center"
      >
        <h1>Blood Ant</h1>
      </Stack>
      {!isLoading && (
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ marginTop: 4 }}
          centered
        >
          <Tab label={"Profile"} icon={<Person />} />
          <Tab label={"Home"} icon={<Home />} />
          <Tab label="History" icon={<History />} />
          <Tab label={"Settings"} icon={<Settings />} />
          <Tab label={"Logout"} icon={<Logout />} />
        </Tabs>
      )}
      <TabPanel value={value} index={0}>
        <Profile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Logs />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AppLogout />
      </TabPanel>
    </Box>
  );
}

export default App;
