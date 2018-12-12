/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const axios = require("axios");
// const passport = require("passport");
const models = require("../models");

// require("../config/passport");
// Axios to pass API requirement
const request = axios.create({
    baseURL: "https://data.energystar.gov/resource",
    headers: { "X-App-Token": "rSGJanpH6okWzqMSAL4lRi4eh" }
});

const energyStarRoutes = {
    fridges: "/ymjh-yrse.json",
    dishwashers: "/v32c-ywkg.json",
    washers: "/k5sb-ibyp.json",
    dryers: "/cv4u-mmnf.json"
};

// Register route
router.post("/register", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Login route
// router.post("/login", (req, res, next) => {
//     console.log("here at least");
//     passport.authenticate("local-signin", {}, (err, user, info) => {
//         if (err) {
//             return res.status(500).send({ message: "An error occured" });
//         }
//         if (!user) {
//             return res.status(404).send(info);
//         }
//         return res.send({
//             message: "Login success",
//             user
//         });
//     })(req, res, next);
// });

// router.post("/signup", (req, res, next) => {
//     console.log("here at least");
//     passport.authenticate("local-signup", {}, (err, user, info) => {
//         console.log("Error: ", err);
//         if (err) {
//             return res.status(500).send({ message: "An error occured" });
//         }
//         if (!user) {
//             return res.status(404).send(info);
//         }
//         return res.send({
//             message: "Login success",
//             user
//         });
//     })(req, res, next);
// });

router.get("/refresh/:cat", async (req, res) => {
    const cat = req.params.cat;
    const cats = Object.keys(energyStarRoutes);
    if (cats.indexOf(cat) === -1) {
        throw new Error("Category does not exist!");
    }
    const resp = await request.get(energyStarRoutes[cat]);
    const products = resp.data[0];
    for (p of products) {
        // eslint-disable-next-line dot-notation
        const product = models["Product"].build({
            type: cat,
            brand_name: p.brand_name,
            additional_model_information: p.additional_model_information,
            model_number: p.model_number,
            meets_most_efficient_criteria: p.meets_more_efficient_criteria
        });
        await product.save();
    }

    // await Product.saveBulk(products);

    res.send(resp);
});
module.exports = router;
