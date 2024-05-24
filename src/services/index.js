import service from "./service";

const userRegister = (data) => service.post("/sign_up", data);
const loadFilters = () => service.get("/logs/filters");
const submitLog = (data) => service.post("/logs", data);
const userLogin = (data) => service.post("/sign_in", data);
const userProfile = () => service.get("/profile");
const userLogout = (id) => service.delete(`/sessions/${id}`);
const userLogAdd = (data) => service.post("/logs", { log: data });
const userLogs = ({ params }) =>
  service.get("/logs", { params: { ...params } });
const userLogDelete = (id) => service.delete(`/logs/${id}`);
const userActiveLogs = () => service.get("/logs/active");
const userLogUpdate = ({ id, data }) =>
  service.patch(`/logs/${id}`, { log: data });
const userLog = (id) => service.get(`/logs/${id}`);
const userReportGenerate = (params) =>
  service.post("/logs/generate_report", {}, { ...params });
const userActiveDose = () => service.get("/profile/active_dose");
const userDoses = () => service.get("/doses");
const userDoseAdd = (data) => service.post("/doses", { dose: { ...data } });
const userDose = (id) => service.get(`/doses/${id}`);
const userDoseEdit = ({ id, data }) =>
  service.patch(`/doses/${id}`, { dose: { ...data } });
export {
  userDose,
  userDoseEdit,
  userDoses,
  userDoseAdd,
  userActiveDose,
  userReportGenerate,
  userLogDelete,
  userLog,
  userLogUpdate,
  userActiveLogs,
  userLogs,
  userRegister,
  loadFilters,
  submitLog,
  userLogin,
  userProfile,
  userLogout,
  userLogAdd,
};
