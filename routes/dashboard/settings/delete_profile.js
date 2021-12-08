const {Router} = require('express')

const {User} = require('../../../models/users/usersdb')

route = Router()

route.all('/delete',async (req,res)=>{
    console.log(req.session.user)
    if(req.session.user != null){
        User.destroy({where: {username : req.session.user.username}})
            .then(function (rowsdeleted){
                console.log(rowsdeleted)
                req.session.destroy()
                return res.status(200).send({'status':'ok',})
            },function (err){
                console.log(err)
            })
    }
})


module.exports = route