const MongoClient = require("mongoDB").MongoClient;

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/library");


class Book {

  // Тест подключения к базе данных
  mongoDB_Client() { mongoClient.connect(function(err, client) {
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
                  console.log('Ошибка подключения к базе данных' + err);
              }
          });
      });
  }

  // метод поиск книги
  findBooks () {mongoClient.connect(function(err, client) {

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

  // добавление книги
  addBook (answer) { mongoClient.connect((err, client) => {

          // создание - подключение (обращение) к базе данных libraryDB
          const db = client.db("libraryDB");
      
          // создание - подключение к коллеции books
          const books = db.collection("books");
      
          books.insertOne(answer, (err, results) => {
            if (err) {
              console.log('Произошла ошибка при добавлении: ' + err);
            }
            console.log('Книга добавлена в library' + results);
            console.log(answer);
            client.close();
            console.log('Подклчючение закрыто!');
          });
      });
  }

  // удаление книги
  deleteBook (name) {mongoClient.connect((err, client) => {
      
      // создание - подключение (обращение) к базе данных libraryDB
      const db = client.db("libraryDB");
  
      // создание - подключение к коллеции books
      const books = db.collection("books");
      
      books.deleteOne(name, (err, results) => {
        
        if (err) return console.log(err);
        
        console.log('Книга ' + name.nameBook + ' удалена');
        console.log(results);
        client.close();
        console.log('Подклчючение закрыто!');

      });
    });
  }
}

module.exports = {
    Book
}