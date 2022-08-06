/* Livereload */
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();

/* Entry point */
const express = require("express");
const connectLivereload = require('connect-livereload')
const path = require("path");

const app = express();
const port = 3000;

/* Requerir las rutas */
let indexRouter = require('./routes/index')
let administradorRouter = require('./routes/administrador')
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')

/* Archivos estaticos */
app.use(express.static(path.join(__dirname,'public')));

/* Archivos estaticos monitoreados */
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

/*View engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

/*Middlewares */
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'public')));

/*Rutas */
app.use('/', indexRouter);
app.use('/users', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/administrador', administradorRouter);

/* Funcion de actualizacion del servidor */
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  
/* Levantamos el servidor con app listen */
app.listen(port,() => console.log(`Se ha levantado con éxito el servidor en http://localhost:${port}`));


