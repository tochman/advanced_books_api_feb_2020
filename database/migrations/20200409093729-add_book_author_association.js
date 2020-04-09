'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Books', // Source model
      'AuthorId', //name of the new column
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors', //name of the target model/table??
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Books',
      'AuthorId'
    )
  }
};
