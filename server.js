const express = require("express");
const postRouter = require("./posts/postRouter.js");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();
server.use(express.json());

server.use(helmet());
server.use(morgan("dev"));
server.use(logger);

server.use((error, req, res, next) => {
   res.status(error.code).json({ error });
});

server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
   res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
   console.log(`${req.method} request to ${req.url} at ${new Date().toISOString()} from ${req.get('Host')}`);
   next();
}

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = server;
