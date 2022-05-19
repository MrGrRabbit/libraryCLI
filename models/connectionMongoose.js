const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

mongoose.connect ("mongodb://127.0.0.1:27017/", 
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    });

const testMongoose = function () {mongoose.connect(function(err, client) {

    // создание - подключение (обращение) к базе данных usersdb
  const db = client.db("libraryDB");
  
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
});
}


module.exports = {
    testMongoose
}




/*
//--------------------
// установка схемы 
const userScheme = new Scheme ({
    name:{
        type: String,
        require: true
        // match - регулярное выражение
    },
    email: String,
    pwd: Number,
    status: Boolean
});


// подключение 
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB", { useUnifiedTopology: true, useNewUrlParser: true });

const Readers = mongoose.model("Readers", userScheme);
const user = new Readers ({
    name: 'Jhon',
    email: 'jhon@gmail.com',
    pwd: 1111,
    status: false

});

Readers.save((err)=> {
    mongoose.disconnect(); // отключение базы данных
    
    if(err) return console.log(err);
    console.log("Сохранен объект", user);
}); 

const getBooks = function (name) {

    Books.find({name}, (err, result) => {
        mongoose.disconnect();
    
    
        if(err) {
            return console.log(err);
        }
    
        return console.log(docs);
    });
} 


module.exports.insertBook = function () {
    
    const book = {nameBook: "Властелин колец" , author: "Джон Р. Р. Толкин", status: "true"};

    console.log(book);

    books.insertOne(book, function(err, result) {
        if (err) {
            return console.log("Ошибка: " + err);
        }

        return console.log(result);
    });
}

module.exports = {
    getBooks 
}
*/