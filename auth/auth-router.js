// const router = require(`express`).Router();

// const bcrypt = require(`bcryptjs`);

// const Users = require(`../users/users-model`);


// router.post('/register', (req, res) => {
//     let user = req.body;
//     console.log(req.body)
//     const hash = bcrypt.hashSync(user.password, 8);
//     user.password = hash;
  
//     Users.add(user)
//       .then(saved => {
//         res.status(201).json(saved);
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   });


// router.post (`/login`, (req, res) => {
//     let { username, password } = req.body;

//     Users.findBy({ username })
//     .first()
//     .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//             res.status(200).json({ message: `Welcome VIP Member ${user.username}!`});
//         } else {
//             res.status(401).json ({message: `Sorry, you have put invalid credentials`});
//         }
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });

// module.exports = router;


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

router.post("/login", authorize, (req, res) => {
  let { username } = req.headers;
  res.status(200).json({ message: `Welcome ${username}!` });
});

module.exports = router;
