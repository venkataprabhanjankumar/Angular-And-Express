var Sequelize = require('sequelize');
var Users = require('./users')

conn = new Sequelize.Sequelize('postgres', 'postgres', 'prabhanjan7241',{
    host : 'localhost',
    dialect : 'postgres',
    pool:{
        max : 5,
        min : 0,
        ideal : 1000
    }
});

conn.authenticate().then(
    ()=>{
        console.log("Connection Created")
    }
).catch((err)=>{
    console.log("Unable to connect"+err.stack)
})

var User = Users(conn,Sequelize)

conn.sync({force : false}).then(()=>{
    console.log("Tables Created");
})

module.exports = {
    User
}