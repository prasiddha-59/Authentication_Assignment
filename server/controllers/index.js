let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose');
let flash = require('connect-flash');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

let userModel = require('../models/user');

let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { page: 'Home' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about_me', { page: 'About Me' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { page: 'Projects' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { page: 'Services' });
}
module.exports.displayContactMePage = (req, res, next) => {
    res.render('contact_me', { page: 'Contact Me' });
}

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/login',
            {
                page: "Login",
                messages: req.flash('loginMessage'),
                displayName: req.user ? req.user.displayName : ''
            })
    }
    else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate("local",
        (err, user, info) => {
            // server err?
            if (err) {
                return next(err);
            }
            // is there a user login error?
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                // server error?
                if (err) {
                    return next(err);
                }

                const payload =
                {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                }

                const authToken = jwt.sign(payload, DB.Secret, {
                    expiresIn: 604800
                });

                return res.redirect('/business');
            });
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if (!req.user) {
        res.render('auth/register',
            {
                page: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
    }
    else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
                {
                    page: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
        }
        else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/business')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}