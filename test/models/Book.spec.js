const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');
const { factory, expect } = require('../../test_helpers');

// we need to import the models directly to avoid connecting to the db
const Book = require('../../models/book');
const Author = require('../../models/author');


describe('Book', () => {
  const DescribedModel = Book(sequelize, dataTypes);
  const instance = new DescribedModel();

  checkModelName(DescribedModel)('Book');

  describe('properties', () => {
    checkPropertyExists(instance)('title');
  });

  describe('associations', () => {
    before(() => {
      DescribedModel.associate({ Author });
    });

    it('defines a belongsTo association with Author', () => {
      expect(DescribedModel.belongsTo)
        .to.have.been.calledWith(Author);
    });
  });

  describe('constraints', () => {
    it('rejects null value for title', async () => {
      try {
        await factory.create('Book',
          {
            title: null
          }
        );
        expect.fail();
      } catch (err) {
        expect(err.errors)
          .to.containSubset([{ message: 'Book.title cannot be null' }]);
      }
    });
  });

  describe('validations', () => {
    it('rejects empty string for title', async () => {
      try {
        await factory.create('Book', {
          title: ''
        });
        expect.fail();
      } catch (err) {
        expect(err)
          .to.include(
            {
              message: 'Validation error: You need to set a title!'
            }
          );
      }
    });
  });
});