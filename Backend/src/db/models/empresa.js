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
      primaryKey: true
    },
    razonSocial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nroSap: {
      type: DataTypes.STRING
    },
    emailContacto: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Empresa',
    tableName: 'Empresas',
    timestamps: false,
  });

  return Empresa;
};