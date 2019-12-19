let express = require('express');
let app = express();
let locationRoute = require('./routes/location');
let path = require('path');
let bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body);
    //res.send('')
    next()
})
app.use(locationRoute);

//Handler for 404 -resource not found
app.use((req,res,next) => {
    res.status(404).send('We think you are lost');
})

//Handler for Error 505
app.use((err,req,res,next) => {
    console.error(err.stack)

    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 5003;
const HOST = '0.0.0.0';
app.listen(PORT,() => console.info(`server has started on ${HOST}:${PORT}`));