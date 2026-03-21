const validEmailToClient = (emails) => {
    return {email: emails[0].email}
}

const validUsernameToClient = (usernames) => {
    return {username: usernames[0].username}
}

module.exports = {
    validEmailToClient,
    validUsernameToClient
}