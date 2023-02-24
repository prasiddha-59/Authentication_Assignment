let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Business = require('../models/business');

let contactController = require('../controllers/contact');


function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

router.get('/', requireAuth, contactController.displayContactList);

router.get('/add', requireAuth, contactController.displayAddPage);

router.post('/add', requireAuth, contactController.processAddPage);

router.get('/edit/:id', requireAuth, contactController.displayEditPage);

router.post('/edit/:id', requireAuth, contactController.processEditPage);

router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;