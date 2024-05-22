import service from "./service";

const userRegister = (data) => service.post("/sign_up", data);
const loadFilters = () => service.get("/logs/filters");
const submitLog = (data) => service.post("/logs", data);
const userLogin = (data) => service.post("/sign_in", data);
const userProfile = () => service.get("/profile");
const userLogout = (id) => service.delete(`/sessions/${id}`);
const userLogAdd = (data) => service.post("/logs", { log: data });
const userLogs = ({ params, page }) =>
  service.get("/logs", { params: { ...params, page: page } });
const userLogDelete = (id) => service.delete(`/logs/${id}`);

export {
  userLogDelete,
  userLogs,
  userRegister,
  loadFilters,
  submitLog,
  userLogin,
  userProfile,
  userLogout,
  userLogAdd,
};
