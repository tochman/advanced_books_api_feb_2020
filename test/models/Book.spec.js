const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');
const { expect } = require('../../test_helpers');


const Book = require('../../models/book');

describe('Book', () => {
  const DescribedModel = Book(sequelize, dataTypes);
  const instance = new DescribedModel();

  checkModelName(DescribedModel)('Book');

  context('properties', () => {
    ;['title'].forEach(checkPropertyExists(instance));
  });
  context('associations', () => {
    const Author = require('../../models/author');
    before(() => {
      DescribedModel.associate({ Author });
    });

    it('defined a belongsTo association with Author', () => {
      expect(DescribedModel.belongsTo).to.have.been.calledWith(Author);
    });
  });
});