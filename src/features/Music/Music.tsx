import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const Music = () => {
  return (
    <Box component={"div"} sx={{ width: "600px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ opacity: "0.5", textAlign: "center" }}>
        This page is develop
      </Typography>
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={"100%"} height={60} />
        <Skeleton variant="rounded" width={"100%"} height={60} />
      </Stack>
    </Box>
  );
};
