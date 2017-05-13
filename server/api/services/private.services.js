const mongoose = require('mongoose');
const SystemService = require('./system.service').SystemServices;

const systemService = new SystemService();
const Private = mongoose.model('Private');


class PrivateServices {
    constructor () {}

    createPrivateChat (req, res) {
        let privateChat = new Private({
            users: [
                mongoose.Types.ObjectId(req.USER_INFO._id),
                mongoose.Types.ObjectId(req.body.user_id)
            ]
        });

        privateChat.save((err, doc) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            systemService.responseGenerator(req, res, true, doc, 20000);
        })
    }

    listOfPrivateChats (req, res) {
        Private.find({users: { $in: [req.USER_INFO._id]}}).exec((err, docs) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            systemService.responseGenerator(req, res, true, docs, 20000);
        });
    }
}

exports.PrivateServices = PrivateServices;