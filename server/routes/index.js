var express = require('express');
var router = express.Router();

let indexController = require('../controllers');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);


router.get('/projects', indexController.displayProjectsPage);

router.get('/about-me', indexController.displayAboutPage);

router.get('/services', indexController.displayServicesPage);

router.get('/contact-me', indexController.displayContactMePage);

router.post('/contact-me', indexController.displayContactMePage);

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);



module.exports = router;
