const sessionIdToUserMap = new Map();

function setUser(sessionId, User){
    sessionIdToUserMap.set(sessionId, User);
}

function getUser(sessionId){
    return sessionIdToUserMap.get(sessionId);
}

module.exports = {
    setUser, getUser,
}