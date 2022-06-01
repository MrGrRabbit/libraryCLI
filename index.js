#!/usr/bin/env node

const { program } = require('commander');
const { prompt } = require('inquirer');
const { prototype } = require('inquirer/lib/objects/choice');

// импорт класса Book & checkReaders
const { Book } = require('./models/book.js')
const {Readers} = require('./controllers/author');
// создание экземпляра класса 
let book = new Book();
let readers = new Readers();


// написание вопросов
const questionsStart = [
  {
    type: 'rawlist',
    name: 'startList',
    message: 'Choose relevant variant: ',
    choices: ['Test connection', 'other']
  }
]

const questionsInputName = [
  {
  type: 'input',
  name: 'firstname',
  message: 'Input name: '
}
];

const questionsAddBook = [
  {
    type: 'input',
    name: 'nameBook',
    message: 'Enter name book: '
  },
  {
    type: 'input',
    name: 'author',
    message: 'Enter name author (example: Толстой Л.Н.): '
  },
  {
    type: 'input',
    name: 'status',
    message: 'Enter status book (default: true): ',
    default: 'true'
  },
]

const questionsDeleteBook = [
  {
    type: 'input',
    name: 'nameBook',
    message: 'Enter the name of the book you want to delete: '
  }
]

const questionsAuth = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the user name: '
  },
  {
    type: 'password',
    name: 'pwd',
    message: 'Enter the password: '
  }
]

//-----------------------------
// Описание команд скрипта

// версия программы
program
  .version('0.0.1')
  .description('User management system');

// старт программы
program
  .command('start')
  .description('Check a connection to data base')
  .action(() => {
    prompt(questionsStart).then((answer) => book.mongoDB_Client(answer));
  });

// вывод всех книг
program
  .command('getAllBooks')
  .alias('G')
  .description('See all books')
  .action(() => book.findBooks());
// добавление книги
program
  .command('addBook')
  .description('Add book in library data base')
  .action(() => {
    prompt(questionsAddBook).then((answers)=> book.addBook(answers))
  });
// удаление книги 
program
  .command('deleteBook')
  .description('Delete book from library data base')
  .action(() => {
    prompt(questionsDeleteBook).then((nameBook) => book.deleteBook(nameBook));
  });

// авторизация
program
  .command('auth')
  .description('Display all Readers')
  .action(() => {
    prompt(questionsAuth).then((logIn) => {readers.checkReaders(logIn.name);
    }); 
  });



// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);
