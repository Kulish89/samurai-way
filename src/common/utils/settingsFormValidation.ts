type valuesType = {
  fullName?: string | null;
  aboutMe?: string | null;
  lookingForAJob?: boolean;
  lookingForAJobDescription?: string | null;
  facebook?: string | null;
  website?: string | null;
  vk?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  github?: string | null;
  mainLink?: string | null;
};

export const settingsFormValidation = (values: valuesType) => {
  const errors: valuesType = {};
  if (values.facebook !== null && values.facebook?.length) {
    if (!/https?:\/\/(www\.)?facebook.com\//i.test(values.facebook)) {
      errors.facebook = "Invalid facebook link";
    }
  }
  if (values.vk !== null && values.vk?.length) {
    if (!/https?:\/\/(www\.)?vk.com\//i.test(values.vk)) {
      errors.vk = "Invalid vk link";
    }
  }
  if (values.github !== null && values.github?.length) {
    if (!/https?:\/\/(www\.)?github.com\//i.test(values.github)) {
      errors.github = "Invalid github link";
    }
  }
  if (values.instagram !== null && values.instagram?.length) {
    if (!/https?:\/\/(www\.)?instagram.com\//i.test(values.instagram)) {
      errors.instagram = "Invalid instagram link";
    }
  }
  if (!values.fullName) {
    errors.fullName = "Insert your name, please!";
  }

  return errors;
};
