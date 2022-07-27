/* Livereload */
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();

/* Entry point */
const express = require("express");
const connectLivereload = require('connect-livereload')
const path = require("path");
const { link } = require('fs');

const app = express();
const port = 3000;

/* Archivos estaticos */
app.use(express.static(path.join(__dirname,'public')));

/* Archivos estaticos monitoreados */
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

/* Rutas */
app.get('/',(req,res)=>res.sendFile(path.resolve(__dirname,'views','index.html')))
app.get('/productDetail',(req,res)=>res.sendFile(path.resolve(__dirname,'views','productDetail.html')))
app.get('/productCart',(req,res)=>res.sendFile(path.resolve(__dirname,'views','productCart.html')))
app.get('/register',(req,res)=>res.sendFile(path.resolve(__dirname,'views','register.html')))
app.get('/login',(req,res)=>res.sendFile(path.resolve(__dirname,'views','login.html')))
app.get('/resetPassword',(req,res)=>res.sendFile(path.resolve(__dirname,'views','resetPassword.html')))

/* Funcion de actualizacion del servidor */
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  
/* Levantamos el servidor con app listen */
app.listen(port,() => console.log(`Se ha levantado con éxito el servidor en http://localhost:${port}`));


