const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const process = require('process');


// эксперторт функции добавления книги
//const addBook = require('./controllers/connectionDB.js');


// создание клиента подключения 
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

const start = true;
console.log('Для выхода из приложение нажмите стоп');


// Подключение к БД
mongoClient.connect(function(err, client) {

    // создание - подключение (обращение) к базе данных usersdb
    const db = client.db("libraryDB");
    
    // создание - подключение к коллеции users
    const readers = db.collection("readers");
    const books = db.collection("books");

    // метод command, проверяет подключение к базе данных (наприер: объектом ping);
    db.command({ping: 1}, function(err, result){
    
        if (!err) {
            console.log("Подключение с сервером успешно установлено");
            console.log(result);
        }
        else {
            console.log(err);
        }
    });
    

    // Получение количества документов в коллекции
    readers.countDocuments((err, result) => {

        if (err) {
            return console.log("Ошибка: " + err);
        }

        console.log(`В коллекции readers: ${result} документов`);
    });

    // получение всех книг в бд
    books.find().toArray(function(err, result){
        if(err) {
            console.log(err);
        }
        console.log(result);
    });

    // добавление книги в базу данных
    /*let insertBook = function () {
        // добавление книги
        const book = {nameBook: "Властелин колец" , author: "Джон Р. Р. Толкин", status: "true"};
        console.log(book);
        books.insertOne(book, function(err, result) {
            if (err) {
                return console.log("Ошибка: " + err);
            }
    
            return console.log(result);
        });
    }*/

    //addBook(); // функция добавления  книги в бд
    
    // вывод количества документов в коллекции

    books.countDocuments((err, result) => {

        if (err) {
            return console.log("Ошибка: " + err);
        }

        console.log(`В коллекции books: ${result} документов`);
        
        client.close();
        console.log("Подключение закрыто!");
    });

});

