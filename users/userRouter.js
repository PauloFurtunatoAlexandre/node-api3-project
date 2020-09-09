const express = require("express");

const router = express.Router();

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

router.post("/", (req, res) => {
   Users.insert(req.body)
      .then((user) => {
         res.status(201).json(user);
      })
      .catch((error) => {
         console.error(error);
         next(error);
      });
});

router.post("/:id/posts", (req, res) => {
   const post = {
      text: req.body.text,
      user_id: req.params.id,
   };

   Posts.insert(post)
      .then((userPost) => {
         res.status(201).json(userPost);
      })
      .catch((error) => {
         console.log(error);
         res.status(500).json({ message: "missing post data" });
      });
});

router.get("/", (req, res) => {
   Users.get(req.query)
      .then((user) => {
         res.status(200).json(user);
      })
      .catch((error) => {
         console.error(error);
         next(error);
      });
});

router.get("/:id", validateUserId, (req, res) => {
   Users.getById(req.params.id)
      .then((user) => {
         res.status(201).json(user);
      })
      .catch(() => {
         res.status(500).json({
            message: "There was an error fetching the user from the database",
         });
      });
});

router.get("/:id/posts", (req, res) => {
   Users.getUserPosts(req.params.id)
      .then((posts) => {
         res.status(200).json(posts);
      })
      .catch((error) => {
         console.log(error);
         next(error);
      });
});

router.delete("/:id", (req, res) => {
   Users.remove(req.params.id)
      .then((user) => {
         console.log(user);
         res.status(200).json(user);
      })
      .catch((error) => {
         console.log(error.message);
         next(error.message);
      });
});

router.put("/:id", (req, res) => {
   // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
   if (!req.body) {
      res.status(400).json({ message: "missing user data" });
   }
   if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
   }
   next();
}

function validateUser(req, res, next) {
   // do your magic!
}

function validatePost(req, res, next) {
   // do your magic!
}

module.exports = router;
