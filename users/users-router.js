const router = require('express').Router();
const Users = require (`./users-model`);
const authrequired = require (`../auth/auth-required-middleware`);


router.get (`/`, authrequired, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;