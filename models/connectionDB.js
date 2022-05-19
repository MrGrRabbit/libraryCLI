const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/library");



  // Подключение к БД
 const testDB = function() {mongoClient.connect(function(err, client) {

    // создание - подключение (обращение) к базе данных libraryDB
    const db = client.db("libraryDB");

    // метод command, проверяет подключение к базе данных (наприер: объектом ping);
    db.command({ping: 1}, function(err, result){
    
        if (!err) {
            console.log("Подключение с сервером успешно установлено");
            console.log(result);
            client.close();
        }
        else {
            console.log(err);
        }
    });
  });
}

const findBooks = function() {mongoClient.connect(function(err, client) {

    // создание - подключение (обращение) к базе данных libraryDB
    const db = client.db("libraryDB");

    // создание - подключение к коллеции books
    const books = db.collection("books");

    // получение книг
    books.find().toArray(function (err, results) {
      console.log(results)
      client.close();
      console.log('Подклчючение закрыто!');
    });
  });
}

const addBook = (answers) =>{ mongoClient.connect((err, client) => {

    // создание - подключение (обращение) к базе данных libraryDB
    const db = client.db("libraryDB");

    // создание - подключение к коллеции books
    const books = db.collection("books");

    books.insertOne(answers, (err, results) => {
      if (err) {
        console.log('Произошла ошибка при добавлении: ' + err);
      }
      console.log('Книга добавлена в library' + results);
      console.log(answers);
      client.close();
    })

})
}

module.exports = { 
  testDB,
  findBooks,
  addBook
}

//------------------------------------------------
