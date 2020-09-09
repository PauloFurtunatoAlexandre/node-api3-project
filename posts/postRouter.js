const express = require("express");

const Posts = require("./postDb.js");

const router = express.Router();

router.use((req, res, next) => {
   console.log("Posts router logger...");
   next();
});

router.get("/", (req, res, next) => {
   Posts.get(req.query)
      .then((post) => {
         res.status(200).json(post);
      })
      .catch((error) => {
         console.log(error);
         next(error);
      });
});

router.get("/:id", (req, res) => {
   // do your magic!
});

router.delete("/:id", (req, res) => {
   // do your magic!
});

router.put("/:id", (req, res) => {
   // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
   // do your magic!
}

module.exports = router;
