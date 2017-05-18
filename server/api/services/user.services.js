const mongoose = require('mongoose');
const SystemService = require('./system.service').SystemServices;
const crypto = require('crypto');

var systemService = new SystemService();


class UserServices {
    constructor () {}

    userAuth (req, res) {
        mongoose.model('User').findOne({
            login: req.body.login,
            password: crypto.createHash('sha256').update(req.body.password).digest('base64')
        }, {__v: 0, password: 0}).exec((err, doc) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            else if (!doc)
                return systemService.responseGenerator(req, res, false, null, 20002)

            doc._doc.token = systemService.tokenGenerator(doc._doc);
            systemService.responseGenerator(req, res, true, doc, 20000);
        })
    }

    userValidateToken (req, res) {
        systemService.responseGenerator(req, res, true, req.USER_INFO, 20000);
    }

    userInit (req, res) {

        let login;
        let hash;
        let id = Number((Math.random() * (99999999 - 10000000) + 10000000).toFixed());

        if (req.body.anonymous) {
            login = 'anonymous_' + new Date().getTime();
        } else {
            hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
        }

        var User = mongoose.model('User');
        var user = new User({
            name: req.body.name,
            login: req.body.login || login,
            password: hash || null,
            user_id: id,
            anonymous: req.body.anonymous
        });

        user.save((err, result) => {
            if (err && err.code == 11000)
                return systemService.responseGenerator(req, res, false, null, 20001);
            else if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            // Remove password and Mongoose update version before response to frontend
            delete result._doc.password;
            delete result._doc.__v;

            result._doc.token = systemService.tokenGenerator(result._doc);

            systemService.responseGenerator(req, res, true, result, 20000);
        })
    }

    usersList (req, res) {
        var search = new RegExp(req.query.name, 'i');
        mongoose.model('User').find({name: {$regex: search, $options: 'im'}}, {__v: 0, password: 0}).exec((err, docs) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            systemService.responseGenerator(req, res, true, docs, 20000);
        })
    }
}

exports.UserServices = UserServices;