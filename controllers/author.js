// подключение модуля 
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/library");

class Readers {
    constructor (nameBook, author, bookStatus) {
        this.nameBook = nameBook;
        this.author = author;
        this.bookStatus = bookStatus;
    }
    
    checkReaders (nameReaders) { mongoClient.connect(function(err, client) {
        
        const db = client.db("libraryDB");
        const collection = db.collection("readers");
    
        if (err) return console.log("Ошибка" + err);
    
        collection.find({name: nameReaders}).toArray((err, results) => {
            
            console.log(results);
            client.close();
            console.log("Подключение закрыто!");
        });
    });
}
}


// поиск читателя


// Сопоставить данные пользователя (email, пароль) поиск по имени 

module.exports = {
    Readers
}

