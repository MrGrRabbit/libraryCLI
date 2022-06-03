/**
 * @module index.test
 * @description Тестирование</br>
 */
const {assert} = require('assert');
const {Readers} = require('./controllers/author');
const {Book}  = require('./models/book.js');
// Тесты методов касса Book
describe('models book', function() {
    it('test ping', function() {
        let expectedResult = 1;
        let book = new Book();
        let result = book.mongoDB_Client();
        //let result = 1;
        if (result !== expectedResult)
        {
            throw new Error(`Expected ${expectedResult}, but got ${result}`);
        }
        //assert.strictEqual(result, 1);
    });
});

// Тесты методов класса Readers
describe('controllers author', function() {
    it('test author', function() {
        let expectedResult = 'Tom';
        let readers = new Readers();
        let result = readers.checkReaders('Tom');
        
        if (result !== expectedResult)
        {
            throw new Error(`Expected ${expectedResult}, but got ${result}`);
        }
    });
});
