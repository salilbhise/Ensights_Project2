const passport = require("passport");
const bCrypt = require("bcrypt-nodejs");

// Passport Strategy for authenticating with Username and password
const LocalStrategy = require("passport-local").Strategy;

// Load user model
const db = require("../models");

// Local signin
passport.use(
    "local-signin",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        }, //Closes local strategy object
        function(req, email, password, done) {
            console.log("here??");
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(function(dbUser) {
                if (!dbUser) {
                    return done(null, false, {
                        message: "Incorrect email."
                    });
                } // closes if (!dbUser)

                const passwordValid = bCrypt.compare(password, dbUser.password);
                if (!passwordValid) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                } //closes if(!passwordValid)
                return done(null, dbUser);
            }); //closes .then(function (dbuser))
        } // closes function (req, email, password, done)
    ) // closes new localStrategy({})
); //closes passport.use

// Local signup
passport.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        }, //closes newLocalStrategy Object
        function(email, password, done) {
            db.User.findOne({
                where: {
                    email: email
                } //closes findOne where
            }) //closes db.User.findONe
                .then(function(dbUser) {
                    const generateHash = function(password) {
                        return bCrypt.hashSync(
                            password,
                            bCrypt.genSaltSync(8),
                            null
                        ); //closes bCrypt.hashSync()
                    }; //closes generateHash function

                    if (dbUser) {
                        return done(null, false, {
                            message: "This email is associated with an account"
                        }); // closes return done( {})
                    } // closes if(dbUser)
                    let username = req.body.username;
                    let reqPassword = req.body.password;
                    let email = req.body.username;

                    let password = generateHash(reqPassword);

                    const newUser = db.User.build({
                        username,
                        email,
                        password
                    }); //closes db.User.build({})

                    // eslint-disable-next-line arrow-parens
                    newUser.save().then(savedUser => {
                        done(null, savedUser);
                    }); //closes newUser.then
                    // .catch(error => {
                    //     done(err, false);
                }); //closes db.User.findOne.then({})
        } //closes function(email, password, done) *THIS ONE WAS MISSING*
    ) //closes newLocalStrategy()  *THIS ONE WAS MISSING*
); //closes passport.Use  *THIS ONE WAS MISSING*

// Serializes the user info during the session as an object of req.session.passport.user  {}, which is saved to the session
passport.serializeUser(function(user, cb) {
    cb(null, user);
}); //closes passport.serializeUser

// Matches the true user with the hash for the user during the session to store the session info after the session has ended
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
}); //closes passport.deserializeUser

module.exports = passport;
