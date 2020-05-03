

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Authors', [
      {
        firstName: 'Thomas',
        lastName: 'Ochman',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Aditya',
        lastName: 'Naik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    const authors = await queryInterface.sequelize.query(
      `SELECT id from "Authors";`
    );

    const authorsRows = authors[0];
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          title: 'Learn NodeJS with Thomas',
          createdAt: new Date(),
          updatedAt: new Date(),
          AuthorId: authorsRows[0].id
        },
        {
          title: 'Learn Sequelize with Adi',
          createdAt: new Date(),
          updatedAt: new Date(),
          AuthorId: authorsRows[1].id
        }
      ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
