var EncryptedField = require('sequelize-encrypted')


var key = process.env['ENCRYPTION_KEY']


module.exports = (conn,type)=>{
    var enc_field = EncryptedField(type,key)
    return conn.define('UsersData',{
        user_id : {
            type : type.INTEGER,
            unique : true,
            autoIncrement : true
        },
        first_name : {
            type : type.STRING,
            field : 'first_name'
        },
        last_name : {
            type : type.STRING,
            field: 'last_name'
        },
        username : {
            type : type.STRING,
            field : 'username',
            unique: true,
            primaryKey : true,
            allowNull : false
        },
        email : {
            type : type.STRING,
            field : 'email',
            unique : true,
            allowNull: false
        },
        password: enc_field.vault('password'),
    },{
        freezeTableName : true,
        indexes : [
            {
                unique : true,
                fields : ['username','email']
            }
        ]
    })
}