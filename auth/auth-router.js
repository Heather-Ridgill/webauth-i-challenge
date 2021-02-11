const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authorize = require("./auth-required-middleware.js");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.headers;
// console.log(req.headers)
  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync (password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${username}! Have a cookie....` });
    } else {
      res.status(401).json({message: `You shall not pass!`});
    }
  })
  .catch(error => {
    res.status(500).json({message: `error`});
  });
});

router.delete (`/logout`, (req,res) => {
  if(req.session) {
    req.session.destroy((err) => {
      if(err) {
        res.status(400).send(`unable to logout...`);
      }else{
        res.send(`Sad to see you go!`);
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
