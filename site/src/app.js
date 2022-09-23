/* Livereload */
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();

/* Entry point */
const express = require("express");
const connectLivereload = require('connect-livereload')
const path = require("path");
const session = require ('express-session')

const methodOverride = require('method-override')

const app = express();
const port = 3000;
const userLogin= require('./middlewares/userLoginCheck');

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

/* implementacion de session */

app.use(session({
  secret: "XL"
}))
/* aplicacion de validation */
app.use(userLogin);

/*View engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

/* Trabajar con metodos HTTP (post) */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Trabajar con put y delete */
app.use(methodOverride('_method'))

/*Middlewares */
app.use(express.static(path.resolve(__dirname,'..', 'public')));

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