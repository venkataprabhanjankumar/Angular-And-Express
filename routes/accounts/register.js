var {Router} = require('express');
var csrf = require('csurf')
const {Op} = require('sequelize');


var {User}=require('../../models/users/usersdb')


var route = Router()
var csrfProtection = csrf({cookie : true})


route.post('/register',csrfProtection,(request,response)=>{
    User.findOne({
        where : {
            [Op.or] : [
                {
                    username : {[Op.eq] : request.body.username}
                },
                {
                    email : {[Op.eq]: request.body.email}
                }
            ]
        }
    }).then((result)=>{
        if(result===null){
            User.create(request.body).then((result)=>{
            console.log("Insereted")
                return response.send({
                    status : 'ok'
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
        else {
            return response.send({
                status : 'NotOk',
                fail : 'Username Or Email Already Exists'
            })
        }
    }).catch((err)=>{
        console.log(err)
    })
});


module.exports = route