const { getUser } = require('../service/auth')


function checkforatuhentication(req, res, next) {
    req.user = null
    const tokenCookies = req.cookies?.token;
    if (!tokenCookies ) return next()
    const token = tokenCookies
    const user = getUser(token)
    req.user = user;
    next()
}

function restrictTo(rolse = []){
    return function (req, res, next) {
        if(!req.user) return res.redirect('/login')
        if(!rolse.includes(req.user.role)) return res.end('Unothorised')
        return next()
    }
}






async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.headers['authorization']
    if (!userUid) return res.redirect('/login')
    const token = userUid.split('Bearer ')[1]
    console.log(token, 'token')
    const user = await getUser(token)

    if (!user) return res.redirect('/login')
    req.user = user;
    next()
}

async function checkAuth(req, res, next) {
    const userUid = req.headers['authorization']
    const token = userUid.split('Bearer ')[1]

    const user = getUser(token)
    req.user = user;
    next()
}



module.exports = {
    checkforatuhentication,
    restrictTo
}