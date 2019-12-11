const session = require (`express-session`);
const knexSessionStore = require("connect-session-knex")(session);
const express = require (`express`);
const helmet = require (`helmet`);
const cors = require (`cors`);


const configureMiddleware = require (`./configure-middleware`);
const apiRouter = require (`./api-router`);



const sessionOptions = {
    name: `monkey`,
    secret: `cookiesareyummy`,
    cookie: {
       maxAge: 1000 * 30,
       secure: false,
       httpOnly: true, 
    },
    resave: false,
    saveUninitialized: false,


    store: new knexSessionStore({
        knex:require(`../database/dbConfig`),
        tablename: "sessions",
        sidfieldname: `sid`,
        createtable: true,
        clearInterval: 1000 * 60* 60
    }) 
};


const server = express();

configureMiddleware(server);
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

server.use (`/api`, apiRouter);

// server.get(`/` (req,res) => {
//     res.json({ api: 'up' });
// });

module.exports = server;