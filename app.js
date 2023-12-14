var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');



// Configurar la conexión a MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/proyectoFinalProgra4';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión a MongoDB:', err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Ruta principal que renderiza formulario.pug
app.get('/', function(req, res) {
  res.render('formulario');
});

app.get('/cursos', (req, res) => {
  // Renderiza la plantilla de cursos.pug
  res.render('cursos');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
