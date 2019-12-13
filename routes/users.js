const express = require('express');
const router = express.Router();
const random = require("string-random")
const db = require("../middleware/db")
const jwtcheck = require("../middleware/jwtcheck")
router.get("/:user/apikey", async (req, res) => {
  const code = random(32);
  db.put(req.params.user, code)
  res.send(code);
})

/* GET users listing. */
router.get('/test', jwtcheck, function (req, res, next) {
  res.send(req.payload);
});

module.exports = router;