
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING
    // author: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.get('Author')
    //   }
    // }
  }, {});
  Book.associate = models => {
    Book.belongsTo(models.Author, { foreignKey: 'AuthorId', as: 'author' });
  };
  return Book;
};