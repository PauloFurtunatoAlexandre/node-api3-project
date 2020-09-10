const express = require("express");

const router = express.Router();

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

router.post("/", validateUser, (req, res) => {
    Users.insert(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => res.status(500).json({ message: "Database error." }));
});

router.post("/:id/posts", validatePost, (req, res) => {
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
    Users.getById(req.params.id).then((user) => {
        if (user) {
            res.status(201).json(user);
        } else {
            next({
                code: 500,
                message:
                    "There was an error fetching the user from the database",
            });
        }
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id).then((posts) => {
        if (posts) {
            res.status(200).json(posts);
        } else {
            next({ code: 400, message: "Could not fetch the posts." });
        }
    });
});

router.delete("/:id", validateUserId, (req, res) => {
    Users.remove(req.params.id).then((user) => {
        if (user) {
            res.status(200).json({
                message: `User ${req.params.id} has been deleted successfully.`,
            });
        } else {
            next({ code: 400, message: "User not found." });
        }
    });
});

router.put("/:id", validateUserId, (req, res) => {
    Users.update(req.params.id, req.body).then((user) => {
        if (user) {
            res.status(200).json({
                message: `User ${req.params.id} has been changed successfully.`,
            });
        } else {
            next({
                code: 404,
                message: "Could not find the user to apply the changes.",
            });
        }
    });
});

//custom middleware

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
        .then((user) => {
            if (user) {
                next();
            } else {
                res.status({ code: 400, message: "invalid user id" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "server error, try again later." });
        });
}

function validateUser(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next();
    } else {
        next({ message: "missing user data" });
    }
}

function validatePost(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next();
    }
    if (!req.body) {
        next({ code: 400, message: "missing post data" });
    }
    if (!req.body.text) {
        next({ code: 400, message: "missing required text field" });
    }
}

module.exports = router;
