const express = require("express");
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");
// const helmet = require("helmet");
// const morgan = require("morgan");

const server = express();
server.use(express.json());

// server.use(helmet());
// server.use(morgan("dev"));
server.use(logger);

// server.use((error, req, res, next) => {
//    res.status(error.code).json({ error });
// });

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
   res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
   console.log(
      `${req.method} request to ${
         req.url
      } at ${new Date().toISOString()} from ${req.get("Host")}`
   );
   next();
}

module.exports = server;
