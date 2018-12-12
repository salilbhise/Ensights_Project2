// this file shows the sets of routes for showing and sticking data to the database

// Requiring our Todo model
const db = require("../models");

// Routes =============================================================
module.exports = function(app) {
    // Validates if users' authentication is valid for website
    app.get("/api/history/:username", function(req, res) {
        // Creates a post using req.body, then returns the result to the user with res.json
        db.history
            .findAll({
                where: {
                    multipleUsers: req.params.username
                }
            })
            // eslint-disable-next-line prettier/prettier
            .then((result) => {
                if (result.length === 0) {
                    res.send("NO SUCH HISTORY IS PRESENT FOR USER");
                } else {
                    res.json(result);
                }
            });
    });

    // Code use for tracking and creating user history, then returns the result to the user with res.json
    // eslint-disable-next-line no-unused-vars
    app.post("/api/history", function(req, res) {
        db.history
            .create({
                multipleUsers: req.body.userId,
                item: req.body.foods
            })
            // eslint-disable-next-line arrow-parens
            .then(result => {
                // Retrun will be right here
                console.log(result);
            });
    });
};
