/* eslint-disable camelcase */
/// *********************************************************************************
// this file offers a set of routes for sending users to the various handlebar pages

// Dependencies =============================================================
// const express = require("express");
// const router = express.Router();
// const path = require("path");
const db = require("../models");
const bcrypt = require("bcrypt-nodejs");

// Routes =============================================================
module.exports = function(app) {
    // Each of the below routes just handles the handlebar page that the user gets sent to.

    // Login Routes
    app.get("/login", (req, res) => {
        res.render("login");
    });
    app.post("/register", (req, res) => {
        console.log(req.body, "this is the user");
        let newUser = req.body;
        // eslint-disable-next-line arrow-parens
        db.user.find({ where: { email: req.body.email } }).then(user => {
            console.log("-------- user ------");
            if (user) {
                res.send("User already exists");
            } else {
                bcrypt.hash(req.body.password, null, null, function(err, hash) {
                    // Store hash in your password DB.

                    console.log("in ---------------");
                    db.user
                        .create({
                            username: newUser.username,
                            password: hash,
                            email: newUser.email
                        })
                        // eslint-disable-next-line prettier/prettier
                        .then((user) => {
                            res.send(user);
                        });
                });
            }
        });
    });

    // Main/Home Page Route
    app.get("/", (req, res) => {
        res.render("login");
    });

    // users route to about
    app.get("/about", (req, res) => {
        res.render("about");
    });

    // users route to profile
    app.get("/profile", (req, res) => {
        res.render("profile");
    });

    // users route to to products
    // app.get("/products", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../views/login.handlebars"));
    // });

    // demo route to search results
    app.get("/searchresultsdemo", (req, res) => {
        res.render("searchresultsdemo");
    });

    // users route to products
    app.get("/products", (req, res) => {
        res.render("products");
    });

    // users route to products/dishwashers
    app.get("/dishwashers", (req, res) => {
        res.render("dishwashers");
    });

    // users route to products/fridges
    app.get("/fridges", (req, res) => {
        res.render("fridges");
    });

    // users route to products/washers
    app.get("/washers", (req, res) => {
        res.render("washers");
    });

    // users route to products/dryers
    app.get("/dryers", (req, res) => {
        res.render("dryers");
    });

    //Render 404 page for any unmatched routes
    // app.get("*", (req, res) => {
    //     res.render("404");
    // });
};

//Need to add this back for table display
// router.get("/products/:cat", async (req, res) => {
//     const cat = req.params.cat;
//     // const product = await models['Product'].findAll({where: {type: cat}});
//     const products = [
//         {
//             brand_name: "mybrand",
//             additional_model_information: "my additional info",
//             model_number: "model number",
//             meets_most_efficient_criteria: "meets blabla"
//         }
//     ];
//     res.render(cat, {
//         products
//     });
// });
