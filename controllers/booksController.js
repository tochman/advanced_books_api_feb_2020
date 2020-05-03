const models = require('../models');
const bookSerializer = require('../serializers/booksSerializer')

const booksController = {
  async index(req, res, next) {
    const eachSerializer = bookSerializer.index()
    const booksIndex = await models.Book.findAll(eachSerializer);
    res.json({ books: booksIndex });
  },

  async show(req, res, next) {
    let serializer = bookSerializer.show()
    const { id } = req.params;
    const book = await models.Book.findByPk(
      id, serializer);
    res.json({ book });
  }
};

module.exports = booksController;