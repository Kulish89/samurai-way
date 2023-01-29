import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/customHooks";

export const SelectPageSize = () => {
  const pagination = useAppSelector((state) => state.usersReducer.pagination);
  const [searchParams, setSearchParams] = useSearchParams();

  let pagesCount = Math.ceil(
    pagination.totalUsersCount / (Number(searchParams.get("pageSize")) || 1)
  );

  const setPageSize = (e: SelectChangeEvent<number>) => {
    searchParams.set("pageSize", "" + e.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.has("page") || !searchParams.has("pageSize")) {
      searchParams.append("page", "" + pagination.currentPage);
      searchParams.append("pageSize", "" + pagination.pageSize);
    }
    if (Number(searchParams.get("page")) > pagesCount && pagesCount !== 0) {
      searchParams.set("page", "" + pagesCount);
    }
    setSearchParams(searchParams);
  }, [searchParams, pagesCount]);

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <FormHelperText>Users per page</FormHelperText>
      <FormControl variant="standard">
        <Select
          value={Number(searchParams.get("pageSize")) || 10}
          onChange={setPageSize}
          displayEmpty
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
