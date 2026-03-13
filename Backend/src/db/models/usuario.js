'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.NotaCredito, {
        foreignKey: "legajoUsuario"
      });
    }
  }

  Usuario.init({
    legajo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: { msg: "El número de legajo ya se encuentra registrado" },
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Este correo electrónico ya está registrado" },
      validate: {
        notEmpty: { msg: "El email es obligatorio" }, 
        isEmail: { msg: "Formato de email inválido" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps: false
  });

  return Usuario;
};