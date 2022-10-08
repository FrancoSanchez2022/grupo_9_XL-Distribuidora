const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');

const userController = {
  login: (req, res) => {
    const errores = validationResult(req);

    if  (!errores.isEmpty()){

    }else {
      res.render('login', {errores: errores.array()})
    }

    if (req.body.name == 'admin' && req.body.pass == 123) {
    	res.redirect('/dashboard');
    }
  }  
}