const sessionIttopusermap = new Map()

function setUser(id, user) {

    sessionIttopusermap.set(id, user)
}


function getUser(id) {
    return sessionIttopusermap.get(id)
}

module.exports = {
    setUser,
    getUser
}