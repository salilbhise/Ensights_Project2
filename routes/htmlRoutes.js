/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
// const models = require('../models');

// Login Routes
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/register", (req, res) => {
    res.render("register");
});

// Main Page Route
router.get("/", (req, res) => {
    res.render("index");
});

// Product Routes
router.get("/products/dishwashers", (req, res) => {
    res.get("dishwashers");
});
router.get("/products/fridges", (req, res) => {
    res.render("fridges");
});
router.get("/products/washers", (req, res) => {
    res.render("washers");
});
router.get("/products/dryers", (req, res) => {
    res.render("dryers");
});

router.get("/products/:cat", async (req, res) => {
    const cat = req.params.cat;
    // const product = await models['Product'].findAll({where: {type: cat}});
    const products = [
        {
            brand_name: "mybrand",
            additional_model_information: "my additional info",
            model_number: "model number",
            meets_most_efficient_criteria: "meets blabla"
        }
    ];
    res.render(cat, { products });
});

module.exports = router;
