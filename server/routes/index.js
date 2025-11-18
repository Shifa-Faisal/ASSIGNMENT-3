var express = require('express');
var router = express.Router();
let DB = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About us' });
});

/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact us' });
});

module.exports = router;
