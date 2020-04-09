'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.get('firstName')} ${this.get('lastName')}`
      }
    },
  }, {});
  Author.associate = function (models) {
    Author.hasMany(models.Book, {as: 'books'})
  };
  return Author;
};