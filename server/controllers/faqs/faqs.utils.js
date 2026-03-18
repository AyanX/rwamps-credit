
const faqsToClientFormat = (faqs) => {

    const unDeletedFaqs = faqs.filter((faq) => !faq.isDeleted);

    const formattedFaqs = unDeletedFaqs.map((faq) => ({
      id: faq.id,
      title: faq.title,
      content: faq.content
    }));
    //remove deleted faqs
    return formattedFaqs
  };
  
  const validToDbFormat = (data) => {
    return {
      title: data.title,
      content: data.content,
    };
  };
  
  const faqsValidatorAllFieldsRequired = (data) => {
    return data.title && data.content;
  };
  
  module.exports = {
    faqsToClientFormat,
    validToDbFormat,
    faqsValidatorAllFieldsRequired,
  };