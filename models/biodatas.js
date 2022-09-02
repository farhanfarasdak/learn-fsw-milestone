'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodatas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
    }
  }
  Biodatas.init({
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    job: DataTypes.STRING,
    age: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Biodatas',
  });
  return Biodatas;
};