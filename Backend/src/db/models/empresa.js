'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      Empresa.hasMany(models.NotaCredito, {
        foreignKey: "nroCliente"
      });
    }
  }

  Empresa.init({
    nroCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: { msg: "Este numero de cliente ya esta registrado para una empresa"}
    },
    razonSocial: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: { msg: "Esta razon social ya esta guardada" },
    },
    cuit: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: { msg: "Este cuit ya esta en uso para una empresa"},
      validate: {
        isNumeric: { msg: "El CUIT debe contener solo números" },
        len: {
          args: [11, 11],
          msg: "El CUIT debe tener exactamente 11 números"
        }
      }
    },
    nroSap: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: { msg: "Este numero de SAP ya esta registrado para una empresa"},
      validate: {
        len: {
          args: [7, 7],
          msg: "El número de SAP debe tener exactamente 7 caracteres"
        }
      }
    },
    emailContacto: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      validate: {
        isEmail: { msg: "El formato del correo electrónico no es válido" }
      }
    }
  }, {
    sequelize,
    modelName: 'Empresa',
    tableName: 'Empresas',
    timestamps: false,
  });

  return Empresa;
};