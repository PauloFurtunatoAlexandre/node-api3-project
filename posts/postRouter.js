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
   Posts.get(req.params.id)
      .then((post) => {
         res.status(200).json(res.post);
      })
      .catch((error) => {
         next(error);
      });
});

router.delete("/:id", (req, res) => {
   // do your magic!
});

router.put("/:id", (req, res) => {
   // do your magic!
});

// custom middleware

function validatePost(req, res, next) {
   if (req.body) {
      next();
   } else if (!req.body) {
      res.status(400).json({ message: "missing post data" });
   } else if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
   }
}

module.exports = router;
