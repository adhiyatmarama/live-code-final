require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000

const errorHandler = require('./Middlewares/errorHandler')
const userRoute = require('./Routes/UserRoute')
const countryRoute = require('./Routes/CountruRoute')
const reportRoute = require('./Routes/ReportRoutes')

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/login', userRoute)
app.use('/countries', countryRoute)
app.use('/reports', reportRoute)
app.use(errorHandler)

app.listen(port, () => {
    console.log('listeing on port: ', port)
})
