const jwt = require('jsonwebtoken');
const db = require("./db")
const check = (user, token) => {
  return new Promise((res, rej) => {
    db.get(user, (err, secret) => {
      if (err) {
        res(null);
        console.log(err);
        return;
      }
      jwt.verify(token, secret, (err, data) => {
        if (err) {
          console.log(err);
          res(null);
          return;
        }
        res(data);
        return;

      });
    });
  })
}
module.exports = async (req, res, next) => {
  let token = req.query.token || "";
  let user = req.query.user || "";
  let payload = await check(user, token);
  if (!payload) {
    res.status(403).send("Forbidden");
    return;
  }
  req.payload = payload;
  next();
};