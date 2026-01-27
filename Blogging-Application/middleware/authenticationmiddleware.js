

function checkAuthenticationcookie(cookieName) {

    return (req, res, next) => { 
        const tokekcookies = req.cookies[cookieName]
        if(!tokekcookies) {
            next();
        }
        try {
            const userpayload = verifyToken(tokekcookies);
            req.user = userpayload;
        } catch (error) {
            console.log('Invalid Token');
            next(); 
        }
    }
}

module.exports = {
    checkAuthenticationcookie
}