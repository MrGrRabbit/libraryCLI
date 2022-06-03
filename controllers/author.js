/**
 * @module Readers
 * @description класс читателей
 */

// подключение модуля 
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/library");

/**
 * @class Readers
 * @description класс читателей. </br>
 * Исполняет метод - просмотр читателей
 */
class Readers {
        constructor (nameBook, author, bookStatus) {
            this.nameBook = nameBook;
            this.author = author;
            this.bookStatus = bookStatus;
        }

        /**
         * @function 
         * @name checkReaders
         * @param {string} nameReaders 
         * @returns nameReaders
         * @description Метод, который ищет читателя в базе данных по имени
         */
        checkReaders (nameReaders) { mongoClient.connect(function(err, client) {
            
            const db = client.db("libraryDB");
            const collection = db.collection("readers");

            if (!err) {
                collection.find({name: nameReaders}).toArray((err, results) => {
                
                    console.log(results);
                    client.close();
                    console.log("Подключение закрыто!");
                    
                });
            }
            else 
            {
                return console.log("Ошибка" + err);
            }
        });
        return nameReaders;
    }
}


// поиск читателя


// Сопоставить данные пользователя (email, пароль) поиск по имени 

module.exports = {
    Readers
}

