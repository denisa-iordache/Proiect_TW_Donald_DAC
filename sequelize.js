const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/proiect.db'
});

// sequelize.sync({alter:true}).then(()=>{
//     console.log('Toate tabelele au fost sincronizate cu succes!');
// });

module.exports = sequelize;