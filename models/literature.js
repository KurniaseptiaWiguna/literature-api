'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  literature.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    publication_date: DataTypes.DATE,
    pages: DataTypes.INTEGER,
    isbn: DataTypes.INTEGER,
    author: DataTypes.STRING,
    attachment: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'literature',
  });
  return literature;
};