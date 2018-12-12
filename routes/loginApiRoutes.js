// this file shows the sets of routes for showing and sticking data to the database

// Requiring our Todo model
const db = require("../models");

// Routes =============================================================
module.exports = function(app) {
    // Post will register new user into the db
    app.post("/api/registerusers", function(req, res) {
        // Searches for all posts, and then returns the result to the user with res.json
        db.users
            .create({
                username: req.body.username,
                password: req.body.password
            })
            // eslint-disable-next-line prettier/prettier
            .then((result) => {
                res.json(result);
            });
    });

    // Validates if users' authentication is valid for website
    app.post("/api/authenticateusers", function(req, res) {
        // Creates a post (using req.body). Then returns the result to the user with res.json
        db.users
            .findAll({
                where: {
                    email: req.body.username,
                    password: req.body.password
                }
            })
            // eslint-disable-next-line arrow-parens
            .then(result => {
                console.log(result);
                if (result.length === 0) {
                    res.send("NOT A VALID LOGIN");
                } else {
                    res.send("SUCCESSFUL LOGIN");
                }
            });
    });
};
