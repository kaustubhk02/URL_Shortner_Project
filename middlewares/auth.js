const {getUser} = require('../services/auth');

async function restrictLoggedInUser(req, res, next){

    const userId = req.cookies.loginUid;

    if(!userId) {
        console.log("No Cookie Found");
        return res.redirect('/login');
    }
    const user = getUser(userId);
    console.log(user);
    if(!user) {
        console.log("no User has such uid");
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

/* 
### req.user = user in Authentication Middleware

`req.user` is not a built-in property of the Express request object. It is a custom property that we add ourselves inside middleware.

Since JavaScript objects are dynamic, new properties can be added to an object at runtime. Therefore, we can attach the authenticated user's information to the `req` object using:

req.user = user;

Here, `user` is the user object obtained after verifying the session ID, cookie, or token.

The purpose of storing the user in `req.user` is to avoid fetching the user information repeatedly in every route handler. The authentication middleware fetches the user once, attaches it to the request object, and then calls `next()`.

After that, any route that receives the request can access the authenticated user's information through: 'req.user'

This is a common practice in Express authentication systems because it makes the authenticated user's data available throughout the request lifecycle.

*/
// A short memory line:
// Authentication middleware verifies the user once, stores the user in req.user, and makes it available to all subsequent route handlers.

async function checkAuth(req, res, next){

    const userId = req.cookies.loginUid;

    const user = getUser(userId);
    console.log(user);

    req.user = user;
    next();
}

module.exports = {
    restrictLoggedInUser,
    checkAuth,
}