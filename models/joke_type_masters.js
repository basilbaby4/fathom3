'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class joke_type_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  joke_type_masters.init({
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'joke_type_masters',
  });
  return joke_type_masters;
};