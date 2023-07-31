const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middlewares/errorMiddleware')
const checkAuth = require('./middlewares/firebaseValidation')

//Firebase connection
const admin = require("firebase-admin")
const serviceAccount = require("./remindernote-39f26-firebase-adminsdk-vkugl-7de47932d1.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

connectDB()

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
}

//Used to wrap the req.body to json object
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )

app.use('/api/user', checkAuth, require('./routes/userRoutes'))
app.use('/api/data', checkAuth, require('./routes/dataRoutes'))

//Overwrites the default Express Error Handler
app.use(errorHandler)

const server = https.createServer(options, app)

//Set the Port from .env file
const port = process.env.PORT || 5000
server.listen( port, () => console.log(`Server started at port ${port}`) )
