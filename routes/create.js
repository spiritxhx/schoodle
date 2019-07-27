const express = require('express');
const router = express.Router();
const database = require('../db/database');

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("event-create");
  });
  router.post("/", (req, res) => {
    console.log(req.body.creatorName);
    console.log(req.body.creatorEmail);
    creator = {
      name: req.body.creatorName,
      email: req.body.creatorEmail
    };
    database.addCreator(creator);
  });
  return router;
}
