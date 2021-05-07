const express = require('express');
const router = express.Router();

const api_helper = require('../helpers/api_helper')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getOneJoke', api_helper.getOneJoke);


 
module.exports = router;
