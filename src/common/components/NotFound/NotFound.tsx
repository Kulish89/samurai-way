import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { NavLink } from "react-router-dom";
import { PATH } from "../Routing/Routers";

export const NotFound = () => {
  return (
    <Box sx={{ width: "500px", margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h4">404</Typography>
      <Typography variant="h5">Page not found</Typography>
      <SentimentVeryDissatisfiedIcon fontSize="large" />
      <Box>
        <NavLink to={PATH.MAIN}>Go back</NavLink>
      </Box>
    </Box>
  );
};
