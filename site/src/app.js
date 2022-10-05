require('dotenv').config()

/* Livereload */
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();

/* Entry point */
const express = require("express");
const path = require("path");
const connectLivereload = require('connect-livereload')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')

/*Implementamos locals dentro de nuestra aplicacion*/

const userLogin= require('./middlewares/userLoginCheck');
const dbConnectionTest = require('./middlewares/dbConnectionTest')

/* Implementación de locals en la aplicación */
const app = express();
const port = 3000;

/* Importación las rutas */
let indexRouter = require('./routes/index')
let administradorRouter = require('./routes/administrador')
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')

/* Archivos estaticos */
app.use(express.static(path.join(__dirname,'..', 'public')));

/* Archivos estaticos monitoreados */
liveReloadServer.watch(path.join(__dirname,'..', 'public'));
app.use(connectLivereload());

/* aplicacion de validation */
dbConnectionTest()

/*View engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')


/* Trabajar con metodos HTTP (post) */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Trabajar con put y delete */
app.use(methodOverride('_method'))

/*Middlewares */
app.use(session({
  secret: "Xl Distribuidora"
}))
app.use(userLogin);
app.use(cookieParser());


/*Rutas */
app.use('/', indexRouter);
app.use('/users', usuariosRouter);
app.use('/products', productosRouter);
app.use('/admin', administradorRouter);
app.use((req,res,next) => {res.status(404).render('404')})

/* Funcion de actualizacion del servidor */
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  
/* Levantamos el servidor con app listen */
app.listen(port,() => console.log(`Se ha levantado con éxito el servidor en http://localhost:${port}`));