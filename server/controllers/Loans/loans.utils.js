






const loansValidatorAllFieldsRequired = (data) => {
  if (
    !data.title ||
    !data.sub_title ||
    !data.content ||
    !data.card_one_title ||
    !data.card_one_content ||
    !data.card_one_loan_amount_start ||
    !data.card_one_loan_amount_end ||
    !data.card_one_duration_start ||
    !data.card_one_duration_end ||
    !data.card_one_eligibility ||
    !data.card_one_bg_color ||
    !data.card_one_text_color ||
    !data.card_two_title ||
    !data.card_two_content ||
    !data.card_two_loan_amount_start ||
    !data.card_two_loan_amount_end ||
    !data.card_two_duration_start ||
    !data.card_two_duration_end ||
    !data.card_two_eligibility ||
    !data.card_two_bg_color ||
    !data.card_two_text_color
  ) {
    return false;
  }
  return true;
};

const validToDbFormat = (data) => {
  return {
    title: data.title,
    sub_title: data["sub-title"],
    content: data.content,
    card_one_title: data.card_one_title,
    card_one_content: data.card_one_content,
    card_one_loan_amount_start: data.card_one_loan_amount_start,
    card_one_loan_amount_end: data.card_one_loan_amount_end,
    card_one_duration_start: data.card_one_duration_start,
    card_one_duration_end: data.card_one_duration_end,
    card_one_eligibility: data.card_one_eligibility,
    card_one_bg_color: data.card_one_bg_color,
    card_one_text_color: data.card_one_text_color,
    card_two_title: data.card_two_title,
    card_two_content: data.card_two_content,
    card_two_loan_amount_start: data.card_two_loan_amount_start,
    card_two_loan_amount_end: data.card_two_loan_amount_end,
    card_two_duration_start: data.card_two_duration_start,
    card_two_duration_end: data.card_two_duration_end,
    card_two_eligibility: data.card_two_eligibility,
    card_two_bg_color: data.card_two_bg_color,
    card_two_text_color: data.card_two_text_color,
  };
};

const validDataToClientFormat = (data) => {
  const formattedData = data.map((item) => {
    return {
        id: item.id,
      title: item.title,
      "sub-title": item.sub_title,
      content: item.content,
      card_one_title: item.card_one_title,
      card_one_content: item.card_one_content,
      card_one_loan_amount_start: item.card_one_loan_amount_start,
      card_one_loan_amount_end: item.card_one_loan_amount_end,
      card_one_duration_start: item.card_one_duration_start,
      card_one_duration_end: item.card_one_duration_end,
      card_one_eligibility: item.card_one_eligibility,
      card_one_bg_color: item.card_one_bg_color,
      card_one_text_color: item.card_one_text_color,
      card_two_title: item.card_two_title,
      card_two_content: item.card_two_content,
      card_two_loan_amount_start: item.card_two_loan_amount_start,
      card_two_loan_amount_end: item.card_two_loan_amount_end,
      card_two_duration_start: item.card_two_duration_start,
      card_two_duration_end: item.card_two_duration_end,
      card_two_eligibility: item.card_two_eligibility,
      card_two_bg_color: item.card_two_bg_color,
      card_two_text_color: item.card_two_text_color,
    };
  });
  return formattedData;
};

module.exports = {
  loansValidatorAllFieldsRequired,
  validToDbFormat,
  validDataToClientFormat
};
