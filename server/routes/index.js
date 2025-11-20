var express = require('express');
var router = express.Router();
let DB = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/hobby');
});


/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About us' });
});

/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
