const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("event-create");
  });
  router.post("/", (req, res) => {
    console.log(req.body.creatorName);
    console.log(req.body.creatorEmail);
  });
  return router;
}
