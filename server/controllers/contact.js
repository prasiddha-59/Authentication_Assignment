let express = require('express');
let router = express.Router();

// create a reference to the model
let Business = require('../models/business')

module.exports.displayContactList = (req, res, next) => {
    Business.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('business_contact/list', { page: 'Contacts', contactList: contactList });
        }
    }).sort({ name: 1 }).collation({ locale: "en", caseLevel: true });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business_contact/add', { page: 'Add Contact' })
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Business({
        "name": req.body.name,
        "email": req.body.email,
        "contactNumber": req.body.contactNumber,
    });

    Business.create(newContact, (err, Book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/business');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('business_contact/edit', { page: 'Edit Contact', contactList: contactToEdit })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = Business({
        "_id": id,
        "name": req.body.name,
        "email": req.body.email,
        "contactNumber": req.body.contactNumber
    });

    Business.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/business');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/business');
        }
    });
}