
const messageToClient = (messages) => {
      const userMessages = messages.map((message) => {
        return {
            id: message.id,
            name: message.name,
            email: message.email,
            subject: message.subject,
            message: message.message,
            phone_number: message.phone_number,
            isRead: message.isRead,
            isDeleted: false,
        };
    });

    return userMessages;
};


const messageToServer = (message) => {
    return {
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        phone_number: message.phone_number,
    };
};

const isMessageValid = (message) => {
    if (!message.name || !message.email || !message.subject || !message.message || !message.phone_number) {
        return false;
    }
    return true;
}


module.exports = {
    messageToClient,
    messageToServer,
    isMessageValid
};