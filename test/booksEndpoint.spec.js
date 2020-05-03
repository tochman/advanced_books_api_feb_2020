const app = require('../app');
const supertest = require('supertest');
const { factory, expect } = require('../test_helpers');


let server, request, response;

before(done => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after(done => {
  server.close(done);
});

beforeEach(async () => {
  const author = await factory.create('Author',
    { id: 10, firstName: 'Thomas', lastName: 'Ochman' }
  );
  await factory.createMany('Book', 2, [
    { id: 100, title: 'Learn NodeJS with Thomas', AuthorId: author.id },
    { id: 900, title: 'Learn NodeJS with Thomas - The Sequel', AuthorId: author.id }
  ]);
});

afterEach(async () => {
  await factory.cleanUp();
});

describe('GET /api/v1/books', () => {
  beforeEach(async () => {
    response = await request.get('/api/v1/books');
  });

  it('responds with status 200', () => {
    expect(response.status).to.equal(200);
  });

  it('responds with list of booksas an array', () => {
    expect(response.body.books)
      .to.be.an('array');
  });

  it('returns title for books', () => {
    expect(response.body.books[0].title).to.equal('Learn NodeJS with Thomas');
  });
});

describe('GET /api/v1/books/:id', () => {

  it('responds with a single book - id', async () => {
    response = await request.get('/api/v1/books/100');
    expect(response.body.book.id).to.equal(100);
  });

  it('responds with a single book - title', async () => {
    response = await request.get('/api/v1/books/900');
    expect(response.body.book.title).to.equal('Learn NodeJS with Thomas - The Sequel');
  });

  it('responds with a single book - including author', async () => {
    response = await request.get('/api/v1/books/900');
    expect(response.body.book.author.fullName).to.equal('Thomas Ochman');
  });
});