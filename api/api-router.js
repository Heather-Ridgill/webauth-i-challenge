const router = require (`express`).Router();

const authRouter = require (`../auth/auth-router.js`);
const usersRouter = require (`../users/users-router`);


router.use (`./auth`, authRouter);

router.use (`./users`, usersRouter);


module.exports = router;