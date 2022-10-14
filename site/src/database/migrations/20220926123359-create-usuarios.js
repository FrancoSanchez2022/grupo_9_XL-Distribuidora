'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      calle: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      codigoPostal: {
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.STRING
      },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references: {
          model : {
            tableName : 'Roles'
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};