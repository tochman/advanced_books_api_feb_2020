const models = require('../models');


const booksSerializer = {
  show() {
    return {
      include: [
        {
          model: models.Author,
          as: 'author',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      attributes: ['id', 'title']
    }
  },
  index() {
    return {
      include: [
        {
          model: models.Author,
          as: 'author'
        }
      ],
      attributes: ['id', 'title']
    }
  }
}

module.exports = booksSerializer