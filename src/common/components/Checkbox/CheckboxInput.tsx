import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useDebounce } from "../../hooks/customHooks";

export const CheckboxInput = () => {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedChecked = useDebounce(checked, 700);
  const [touchedCheckbox, setTouchedbox] = useState(false);
  const appStatus = useAppSelector((state) => state.appReducer.status);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touchedCheckbox) setTouchedbox(true);
    setChecked(e.target.checked);
  };

  useEffect(() => {
    if (touchedCheckbox) {
      if (!debouncedChecked) {
        searchParams.delete("friend");
        setSearchParams(searchParams);
      } else {
        let checkedValue = debouncedChecked ? "true" : "false";
        if (!searchParams.has("friend")) {
          searchParams.append("friend", checkedValue);
        }
        searchParams.set("friend", checkedValue);
        setSearchParams(searchParams);
      }
    }
  }, [debouncedChecked]);

  useEffect(() => {
    if (searchParams.has("friend")) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [searchParams]);
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChangeCheckbox} />}
      label="Show only friends"
      disabled={appStatus === "loading"}
    />
  );
};
