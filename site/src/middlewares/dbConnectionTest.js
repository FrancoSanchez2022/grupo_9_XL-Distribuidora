const {sequelize} = require('../database/models')

const dbConectionTest = async () => {
    try {
        await sequelize.authenticate()
        console.log('Se levanto correctamente');
    } catch (error) {
        console.log('No pudimos conectarnos con la base de datos',error);
    }
}

module.exports = dbConectionTest