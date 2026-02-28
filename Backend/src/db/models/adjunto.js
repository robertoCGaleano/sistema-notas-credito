'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Adjunto extends Model {
    static associate(models) {
      Adjunto.belongsTo(models.NotaCredito, {
        foreignKey: "idNotaCredito"
      });
    }
  }

  Adjunto.init({
    idArchivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombreArchivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rutaArchivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaCarga: {
      type: DataTypes.DATE,
      allowNull: false
    },
    idNotaCredito: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Adjunto',
    tableName: 'Adjuntos',
    timestamps: false
  });

  return Adjunto;
};