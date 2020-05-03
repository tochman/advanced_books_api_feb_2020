
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "You need to set a title!" }
      }
    }
  }, {});
  Book.associate = models => {
    Book.belongsTo(models.Author, { foreignKey: 'AuthorId', as: 'author' });
  };
  return Book;
};