const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');
const { expect, factory } = require('../../test_helpers');

const Book = require('../../models/book');
const Author = require('../../models/author');

describe('Author', () => {
  const DescribedModel = Author(sequelize, dataTypes);
  const instance = new DescribedModel();

  checkModelName(DescribedModel)('Author');

  context('properties', () => {
    ['firstName', 'lastName', 'fullName']
      .forEach(checkPropertyExists(instance));
  });

  context('associations', () => {
    before(() => {
      DescribedModel.associate({ Book });
    });

    it('defines a hasMany association with Book as "books"', () => {
      expect(DescribedModel.hasMany)
        .to.have.been.calledWith(Book, { as: 'books' });
    });
  });

  describe('constraints', () => {
    ['firstName', 'lastName'].forEach(attribute => {
      it(`requires a ${attribute}`, async () => {
        try {
          await factory.create('Author', {
            [attribute]: null
          });
          expect.fail();
        } catch (err) {
          expect(err.errors)
            .to.containSubset([{
              message: `Author.${attribute} cannot be null`
            }]);
        }
      });
    });
  });
});