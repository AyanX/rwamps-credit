
const validSocial= (social) => {
    const {facebook, twitter, linkedin, email} = social
    return facebook && twitter && linkedin && email;
}

const validSocialToClient = (social) => {
    const {facebook, twitter, linkedin, email} = social
    return {
        id: social.id,
        facebook: facebook || "",
        twitter: twitter || "",
        linkedin: linkedin || "",
        email: email || "",
    }
}

const validSocialToDb = (social) => {
    const {facebook, twitter, linkedin, email} = social
    return {
        facebook: facebook || "",
        twitter: twitter || "",
        linkedin: linkedin || "",
        email: email || "",
    }
}

module.exports = {
    validSocial,
    validSocialToClient,
    validSocialToDb,
}