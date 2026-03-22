const validTestimony = (testimony) => {
  if (
    !testimony.name ||
    !testimony.occupation ||
    !testimony.bio ||
    !testimony.loan_purpose ||
    !testimony.card_color
    || !testimony.text_color
    || !testimony.loan_purpose_text_color
    || !testimony.initials_bg_color
  ) {
    return false;
  }
  return true;
};

const validTestimonyToClient = (testimonies) => {
  return testimonies.map((testimony) => {
    return {
      id: testimony.id,
      name: testimony.name,
      occupation: testimony.occupation,
      bio: testimony.bio,
      loan_purpose: testimony.loan_purpose,
      initials: testimony.initials,
      card_color: testimony.card_color,
      text_color: testimony.text_color,
      loan_purpose_text_color: testimony.loan_purpose_text_color,
      initials_bg_color: testimony.initials_bg_color,
    };
  });
};

const getInitials = (name) => {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/) // Split by any whitespace
    .map((word) => word[0].toUpperCase())
    .join("");
};

const validTestimonyToServer = (testimony) => {
  return {
    name: testimony.name,
    occupation: testimony.occupation,
    bio: testimony.bio,
    loan_purpose: testimony.loan_purpose,
    initials: getInitials(testimony.name),
    card_color: testimony.card_color,
    text_color: testimony.text_color,
    loan_purpose_text_color: testimony.loan_purpose_text_color,
    initials_bg_color: testimony.initials_bg_color,
  };
};

module.exports = {
  validTestimony,
  validTestimonyToClient,
  validTestimonyToServer,
};
