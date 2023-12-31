
const admin = require("firebase-admin")
const asyncHanlder = require('express-async-handler')

//Authorization function
const checkAuth = asyncHanlder (async (req, res, next) => {
    if (req.headers.authtoken) {
        await admin.auth().verifyIdToken(req.headers.authtoken)
        .then((decodedToken) => {
            req.body.userEmail = decodedToken.email
            next()
        }).catch((err) => {
            console.log(err.message)
            res.status(403).send("Invalid Token")
        })

    } else {
        res.status(403).send('Unauthorized')
    }
})

module.exports = checkAuth