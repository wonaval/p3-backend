'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.config.belongsTo(models.user)
    }
  };
  config.init({
    longitude: DataTypes.DECIMAL(9, 6),
    latitude: DataTypes.DECIMAL(8, 6),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'config',
  });
  return config;
};