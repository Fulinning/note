var path = require('path')
var Sequelize = require('sequelize')

const sequelize = new Sequelize(undefined,undefined,undefined,{
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname,"../database/database.sqlite")
});

const note = sequelize.define('note', {
  text: Sequelize.STRING,
  uid: Sequelize.STRING
})

// note.sync({force:true})

module.exports = note