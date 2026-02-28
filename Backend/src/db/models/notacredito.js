'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NotaCredito extends Model {
    static associate(models) {

      NotaCredito.belongsTo(models.Usuario, {
        foreignKey: "legajo"
      });

      NotaCredito.belongsTo(models.Empresa, {
        foreignKey: "nroCliente"
      });

      NotaCredito.hasMany(models.Adjunto, {
        foreignKey: "idNotaCredito"
      });
    }
  }

  NotaCredito.init({
    idNotaCredito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monto: {
      type: DataTypes.INTEGER,
      
    },
    nroFactura: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    legajoUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nroCliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'NotaCredito',
    tableName: 'NotasCredito',
    timestamps: false
  });

  return NotaCredito;
};