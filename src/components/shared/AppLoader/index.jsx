import { Box } from "@mui/material";
import { ProgressBar } from "react-loader-spinner";
import propTypes from "prop-types";
import { useLoader } from "../../../stores/loader";

const AppLoader = ({ open }) => {
  const { visible } = useLoader();
  return (
    <Box
      width="100%"
      position="absolute"
      zIndex={9999}
      bgcolor="#F0F4FF"
      height="100%"
      display={visible || Boolean(open) ? "flex" : "none"}
      justifyContent="center"
      alignItems="center"
    >
      <ProgressBar
        visible={visible || Boolean(open)}
        height="150"
        width="200"
        borderColor="#001A39"
        barColor="#006DCA"
        radius="25.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Box>
  );
};

AppLoader.propTypes = {
  open: propTypes.bool,
};
export default AppLoader;
