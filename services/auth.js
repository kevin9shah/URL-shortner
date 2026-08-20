// const sessionIdToUserMap = new Map();

const jwt = require('jsonwebtoken');




function setUser(user) {

    return jwt.sign({
        _id: user._id,
        email: user.email,
        role : user.role
    }, "SECRETKEY");

    // sessionIdToUserMap.set(id,user);
};

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, "SECRETKEY")
    }
    catch(error) {
        return null;
    }
    // return sessionIdToUserMap.get(id);
};


module.exports = {
    getUser,
    setUser,
}