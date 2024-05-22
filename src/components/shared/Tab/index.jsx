import { Box } from "@mui/material";
import propTypes from "prop-types";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box maxWidth="lg" sx={{ p: 3, margin: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: propTypes.node.isRequired,
  value: propTypes.number.isRequired,
  index: propTypes.number.isRequired,
};
