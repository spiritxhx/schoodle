const express = require('express');
const router = express.Router();
const database = require('../db/database');

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('index');
  });
  return router;
};
