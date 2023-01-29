import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { updateProfileInfo } from "../../../features/Profile/profile-reducer";
import { useAppDispatch, useAppSelector } from "../../hooks/customHooks";
import { settingsFormValidation } from "../../utils/settingsFormValidation";

type SettingsFormPT = {
  handleClose: () => void;
};
export const SettingsForm = ({ handleClose }: SettingsFormPT) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profileReducer.profile);

  const formik = useFormik({
    validate: (values) => {
      return settingsFormValidation(values);
    },
    initialValues: {
      fullName: profile.fullName,
      aboutMe: profile.aboutMe,
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription,
      facebook: profile.contacts.facebook,
      website: profile.contacts.website,
      vk: profile.contacts.vk,
      twitter: profile.contacts.twitter,
      instagram: profile.contacts.instagram,
      youtube: profile.contacts.youtube,
      github: profile.contacts.github,
      mainLink: profile.contacts.mainLink,
    },
    onSubmit: (values) => {
      let data = {
        fullName: values.fullName,
        aboutMe: values.aboutMe,
        lookingForAJob: values.lookingForAJob,
        lookingForAJobDescription: values.lookingForAJobDescription,
        userId: profile.userId,
        contacts: {
          facebook: values.facebook,
          website: values.website,
          vk: values.vk,
          twitter: values.twitter,
          instagram: values.instagram,
          youtube: values.youtube,
          github: values.github,
          mainLink: values.mainLink,
        },
      };
      dispatch(updateProfileInfo(data));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "10px",
          }}
        >
          <TextField
            size="small"
            label="Full name"
            {...formik.getFieldProps("fullName")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.fullName && formik.touched.fullName ? (
            <div style={{ color: "red" }}>{formik.errors.fullName}</div>
          ) : (
            <></>
          )}
          <TextField
            label="About me"
            size="small"
            {...formik.getFieldProps("aboutMe")}
            onBlur={formik.handleBlur}
          />
          <FormControlLabel
            label={"Looking for a job"}
            control={<Checkbox />}
            {...formik.getFieldProps("lookingForAJob")}
            checked={formik.values.lookingForAJob}
          />
          <TextField
            label="Professional skills"
            size="small"
            {...formik.getFieldProps("lookingForAJobDescription")}
            onBlur={formik.handleBlur}
          />
          <TextField
            label="Facebook"
            size="small"
            {...formik.getFieldProps("facebook")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.facebook && formik.touched.facebook ? (
            <div style={{ color: "red" }}>{formik.errors?.facebook}</div>
          ) : (
            <></>
          )}
          <TextField
            label="Website"
            size="small"
            {...formik.getFieldProps("website")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.website && (
            <div style={{ color: "red" }}>{formik.errors.website}</div>
          )}
          <TextField
            label="VK"
            size="small"
            {...formik.getFieldProps("vk")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.vk && (
            <div style={{ color: "red" }}>{formik.errors.vk}</div>
          )}
          <TextField
            label="twitter"
            size="small"
            {...formik.getFieldProps("twitter")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.twitter && (
            <div style={{ color: "red" }}>{formik.errors.twitter}</div>
          )}
          <TextField
            label="instagram"
            size="small"
            {...formik.getFieldProps("instagram")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.instagram && (
            <div style={{ color: "red" }}>{formik.errors.instagram}</div>
          )}
          <TextField
            label="youtube"
            size="small"
            {...formik.getFieldProps("youtube")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.youtube && (
            <div style={{ color: "red" }}>{formik.errors.youtube}</div>
          )}
          <TextField
            label="github"
            size="small"
            {...formik.getFieldProps("github")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.github && (
            <div style={{ color: "red" }}>{formik.errors.github}</div>
          )}
          <TextField
            label="Main link"
            size="small"
            {...formik.getFieldProps("mainLink")}
            onBlur={formik.handleBlur}
          />
          {formik.errors.mainLink && (
            <div style={{ color: "red" }}>{formik.errors.mainLink}</div>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            size={"large"}
          >
            Save
          </Button>
          <Button
            type={"reset"}
            variant={"outlined"}
            color={"secondary"}
            size={"large"}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </FormGroup>
    </form>
  );
};
