// this file registers new users & validates them as well

const db = require("../models");
// const expressValidator = require("express-validator"); not sure if we need on this file
const passport = require("passport");

// Used to hash our passwords to our database for security
const bcrypt = require("bcrypt-nodejs");
const saltRounds = 5;

// Routes =============================================================
module.exports = function(app) {
    app.get("/home", function(req, res) {
        res.render("home", { title: "PROFILE PAGE" });
    });

    app.get("/register", function(req, res) {
        res.render("register", { title: "Register Here" });
    });

    app.get("/profile", authenticationMiddleware(), function(req, res) {
        res.render("dashboard");
    });

    app.post("/register", function(req, res) {
        // Validation check with Middleware
        req.checkBody(
            "name",
            "This field cannot be empty, please type in name."
        ).notEmpty();
        req.checkBody("name", "Name must be between 4-20 characters long.").len(
            2,
            15
        );
        req.checkBody(
            "email",
            "The email you entered is invalid, please type in a valid email."
        ).isEmail();
        req.checkBody(
            "email",
            "Email address must be between 4-110 characters long, please type in a valid email address."
        ).len(4, 100);
        req.checkBody(
            "password",
            "Password must be between 8-110 characters long."
        ).len(8, 100);
        req.checkBody(
            "password",
            "Password must include the following: One lowercase character, one uppercase character, a number, and a special character."
        ).matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
            "i"
        );
        req.checkBody(
            "passwordMatch",
            "Password is not a match, please type in correct password."
        ).equals(req.body.password);

        // Necessary validation to make sure that usernames are alphanumeric with underscores and dashes, etc.
        const errors = req.validationErrors();

        // Sends any areas to console, object to handlebars to render what those errors are
        if (errors) {
            console.log(`errors: ${JSON.stringify(errors)}`);

            res.render("register", {
                title: "Registration Error",
                errors: errors
            });
        } else {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            console.log(name);

            // Password encryption, utilizing the newer bcrypt-nodjs
            bcrypt.hash(password, saltRounds, function(err, hash) {
                db.multipleUsers
                    .create({
                        username: name,
                        password: hash,
                        email: email
                    })
                    // eslint-disable-next-line prettier/prettier
                    .then((result) => {
                        // eslint-disable-next-line camelcase
                        const user_id = result.id;

                        //
                        req.login(user_id, function(err) {
                            if (err) {
                                throw err;
                            }
                            res.redirect("/profile");
                        });
                    });
            });
        }
    });

    // eslint-disable-next-line camelcase
    passport.serializeUser(function(user_id, done) {
        done(null, user_id);
    });

    // eslint-disable-next-line camelcase
    passport.deserializeUser(function(user_id, done) {
        done(null, user_id);
    });

    function authenticationMiddleware() {
        return (req, res, next) => {
            // result returned
            console.log(
                `req.session.passport.user: ${JSON.stringify(
                    req.session.passport
                )}`
            );

            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect("/login");
        };
    }
};
