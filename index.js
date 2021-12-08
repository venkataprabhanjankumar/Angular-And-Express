var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var session = require('express-session')


var usersdb = require('./models/users/usersdb');
var loginroute = require('./routes/accounts/login');
var registerroute = require('./routes/accounts/register');
var csrfroute = require('./routes/csrf/csrf_token');
var check_user = require('./routes/authentication/check_auth')
var logout = require('./routes/authentication/logout');
var delete_acc = require('./routes/dashboard/settings/delete_profile')


var app = express()


app.set('trust proxy',1)


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret : 'secreat_key',
    resave : true,
    saveUninitialized : false
}))
app.use('/',express.static('appui/dist/appui'))
app.use('/media',express.static('media'))


app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});


const logger = function(req, res, next) {
    console.log('logging')
    next()
}
app.use(logger)


//app.use(cors())
/*
allow single origin
app.use(cors({
    origin : "http://127.0.0.1:4200"
}))*/

/*
allowing multiple origins
app.use(cors({
    origin : [
        'http://127.0.0.1:4200',
    ]
}))*/
// it is use when we intracting with angular only
app.use(cors({
    "Access-Control-Allow-Origin" : 'http://127.0.0.1:4200',
    "Access-Control-Allow-Headers" : ["Origin", "Content-Type", "Accept", "X-CSRF-Token", "Authorization","Access-Control-Allow-Origin"],
    "Access-Control-Allow-Credentials" : "true",
    'Access-Control-Allow-Methods':['GET','POST','PUT','DELETE']
}))

/*
we can use this insted of cors
//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4200");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
next();
});*/


app.use('/',loginroute)
app.use('/',registerroute)
app.use('/',csrfroute)
app.use('/',check_user)
app.use('/',logout)
app.use('/',delete_acc)


app.use('/*',(request,response)=>{
   response.sendFile(__dirname+'/appui/dist/appui/index.html')
});


var server = app.listen(3000, 'localhost', () => {
    var host = server.address().address;
    var port = server.address().port
    console.log("Server Is Running at : http://%s:%s", host, port)
});