const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');
const { expect } = require('../../test_helpers');


const Author = require('../../models/author');

describe('Autor', () => {
  const DescribedModel = Author(sequelize, dataTypes);
  const instance = new DescribedModel();

  checkModelName(DescribedModel)('Author');

  context('properties', () => {
    ['firstName', 'lastName', 'fullName'].forEach(checkPropertyExists(instance));
  });
  context('associations', () => {
    const Book = require('../../models/book');
    before(() => {
      DescribedModel.associate({ Book });
    });

    it('defined a hasMany association with Book ass "books"', () => {
      expect(DescribedModel.hasMany)
        .to.have.been.calledWith(Book, { as: 'books' });
    });
  });
});