var {Router} = require('express');
var csrf = require('csurf');

var route = Router();
var csrfProtection = csrf({cookie : true})

route.get('/csrf',csrfProtection,(req,res)=>{
    res.cookie('XSRF-TOKEN',req.csrfToken()) //{httpOnly : false}// httpOnly false means it works with http only
    return res.send({status : 'Ok'})
});

module.exports = route