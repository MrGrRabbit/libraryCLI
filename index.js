#!/usr/bin/env node

const { program } = require('commander');
const { prompt } = require('inquirer');

const { 
 testDB,
 findBooks,
 addBook
} = require('./models/connectionDB');



const questionsStart = [
  {
    type: 'rawlist',
    name: 'startList',
    message: 'Choose relevant variant: ',
    choices: ['authorization', 'other']
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

]

function test () {
  console.log('Check connections to data base');
  
  testDB();
  //testMongoose(); подключение для mongoose
  
}

// версия программы
program
  .version('0.0.1')
  .description('User management system');

// старт программы
program
  .command('start')
  .description('Check a connection to data base')
  .action(() => {
    prompt(questionsStart).then((answers) => test());
  });

// авторизация
const prog = function () { program
  .command('login', 'login in library')
  .description('authorization')
  .alias('l')
  .action(() => {
    prompt(questionsInputName).then(() => console.log('авторизаця'));
  }); 
}
// вывод всех книг
program
  .command('getAllBooks')
  .alias('b')
  .description('See all books')
  .action(() => findBooks());

program
  .command('addBook')
  .description('Add book in library data base')
  .action(() => {
    prompt(questionsAddBook).then((answers)=> addBook(answers))
  })
program
  .command('deleteBook')
  .description('Delete book from library data base')

// показать всех пользователей
program
  .command('getReaders')
  .description('Display all Readers')



// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);



// --------------------------------------------------------

/*const program = require('commander');
const {promt} = require('inquirer');

// добваление файла с библиотекой 
const getBooks = require('./models/connectionDB');

const questions = [
    {
        type: 'input',
        name: 'nameBook',
        masssege: 'Название книги: '
        
    }
]

program
    .command('getBook <name>')
    .alias('r')
    .description('Get User')
    .action(name => getBooks(name));

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
    }
    program.parse(process.argv);

*/