import { useAppSelector, useDebounce } from "../../../common/hooks/customHooks";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string | null>("");
  const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn);
  const location = useLocation();
  const debouncedSearchValue = useDebounce(searchValue, 700);
  const [searchParams, setSearchParams] = useSearchParams();
  const [touchedSearch, setTouchedSearch] = useState(false);

  const onChangeSearchInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouchedSearch(true);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (touchedSearch) {
      if (debouncedSearchValue) {
        if (!searchParams.has("term")) {
          searchParams.append("term", "" + debouncedSearchValue);
        }
        searchParams.set("term", "" + debouncedSearchValue);
        setSearchParams(searchParams);
      } else {
        searchParams.delete("term");
        setSearchParams(searchParams);
      }
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (searchParams.has("term")) {
      setSearchValue(searchParams.get("term"));
    } else {
      setSearchValue("");
    }
  }, [searchParams]);

  useEffect(() => {
    if (location.pathname !== "/users") {
      setSearchValue("");
    }
  }, [location.pathname]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        disabled={location.pathname !== "/users" || !isLoggedIn}
        placeholder="Search user…"
        inputProps={{ "aria-label": "search" }}
        onChange={onChangeSearchInputValue}
        value={searchValue}
      />
      <IconButton
        aria-label="delete"
        disabled={!searchValue}
        onClick={() => setSearchValue("")}
      >
        <ClearRoundedIcon fontSize="small" />
      </IconButton>
    </Search>
  );
};
