
const User = require('../../classes/user');

const makeMessage = (id, message) => {
    const date = new Date();
    const emisor = User.getUserOnline(id);

    return `${emisor.user} said: ${message}              ${date.getHours()}:${date.getMinutes()}`
}

module.exports = {
    makeMessage
}