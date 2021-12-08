var {Router} = require('express')
var csrf = require('csurf')


var {User} = require('../../models/users/usersdb');


var route = Router()
var csrfProtection = csrf({cookie :true})


route.post('/login',csrfProtection,(request,response)=>{
    User.findOne({
        where : {username : request.body.username},
    }).then((result)=>{
        if(result !==null){
            if(result.password === request.body.password){
                request.session.user ={
                    username : result.username,
                    email : result.email,
                    id : result._id,
                }
                // session expires in 2 days
                request.session.user.expires = new Date(Date.now() + 2 * 24 * 3600 * 1000)
                return response.status(200).send(
                   {
                       'status':'ok',
                   }
                )
            }
           else {
               return response.status(401).send(
                   {
                       'status':'NotOk',
                       'err_msg':'Invalid Crdentials'
                   }
               )
           }
        }
        else {
               return response.send(
                   {
                       'status':'NotOk',
                       'err_msg':'Invalid Crdentials'
                   }
               )
        }
    }).catch((err)=>{
        console.log(err);
    })
});


module.exports = route