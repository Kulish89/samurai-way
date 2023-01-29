import { useAppSelector } from "../../../common/hooks/customHooks";
import { ReactComponent as facebook } from "../../../assets/icons/facebook.svg";
import { ReactComponent as website } from "../../../assets/icons/website.svg";
import { ReactComponent as vk } from "../../../assets/icons/vk.svg";
import { ReactComponent as twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as instagram } from "../../../assets/icons/instagram.svg";
import { ReactComponent as youtube } from "../../../assets/icons/youtube.svg";
import { ReactComponent as github } from "../../../assets/icons/github.svg";
import { ReactComponent as mainLink } from "../../../assets/icons/mainLink.svg";
import { Box, Link, SvgIcon, Typography } from "@mui/material";

const contactIcons = {
  facebook,
  website,
  vk,
  twitter,
  instagram,
  youtube,
  github,
  mainLink,
};

export const ProfileContacts = () => {
  const profileContacts = useAppSelector(
    (state) => state.profileReducer.profile.contacts
  );

  return Object.values(profileContacts).find(
    (el) => el !== null && el !== ""
  ) ? (
    <Box sx={{ display: "flex", alignItems: "center", gap: "13px" }}>
      <Typography component="p" variant="body2" color={"primary"}>
        {"Contacts: "}
      </Typography>
      {Object.keys(profileContacts).length &&
        Object.keys(profileContacts).map((c: string, index: number) => {
          // @ts-ignore
          let value: string | null = profileContacts[c];
          if (value) {
            return (
              <Link href={value} target="_blank" key={index}>
                <SvgIcon
                  color="primary"
                  // @ts-ignore
                  component={contactIcons[c]}
                  inheritViewBox
                />
              </Link>
            );
          }
          return null;
        })}
    </Box>
  ) : (
    <></>
  );
};
