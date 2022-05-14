const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

const port = 3000;

app.get("/", (request, response) => {
    response.send("<h2> 1. Library </h2>");

});

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
mongoClient.connect(function(err, client){
    // создание - подключение (обращение) к базе данных usersdb
    const db = client.db("libraryDB");
    // создание - подключение к коллеции users
    const readers = db.collection("readers");
    const books = db.collection("books");
    const admin = db.collection("admin");
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
    admin.countDocuments((err, result) => {

        if (err) {
            return console.log("Ошибка: " + err);
        }

        console.log(`В коллекции admin: ${result} документов`);
    });
    books.countDocuments((err, result) => {

        if (err) {
            return console.log("Ошибка: " + err);
        }

        console.log(`В коллекции books: ${result} документов`);
        client.close();
        console.log("Подключение закрыто!");
    });

});



app.listen(port, () => console.log(`server start, port: ${port}`));
