'use strict';
module.exports = function (factory, Models) {
  factory.define('Book', Models.Book, {
    title: 'Foo',
    createdAt: new Date(),
    updatedAt: new Date()
  });
};