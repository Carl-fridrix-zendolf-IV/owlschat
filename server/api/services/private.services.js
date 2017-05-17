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
        Private.aggregate([
            { $match: {users: { $in: [mongoose.Types.ObjectId(req.USER_INFO._id)]}} },
            { $unwind: "$users" },
            { $lookup: { from: 'users', localField: 'users', foreignField: '_id', as: 'users_desc'} },
            { $unwind: "$users_desc" },
            { $group: {
                _id: "$_id",
                users: { $addToSet: "$users_desc" },
                timestamp: { $first: "$timestamp" }
            } }
        ]).exec((err, docs) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            for(let item of docs) {
                item.receiver = item.users.find((element, index, array) => {
                    if (element._id.toString() === req.USER_INFO._id.toString())
                        return false;
                    else
                        return element
                })
            }


            systemService.responseGenerator(req, res, true, docs, 20000);
        })
    }
}

exports.PrivateServices = PrivateServices;