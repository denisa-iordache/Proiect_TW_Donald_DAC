const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({Status:"Serverul a rulat cu succes."});
});
module.exports = router;

//buna sunt ana
