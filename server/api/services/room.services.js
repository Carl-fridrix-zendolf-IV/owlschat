const mongoose = require('mongoose');
const SystemService = require('./system.service').SystemServices;

const systemService = new SystemService();
const Room = mongoose.model('Room');


class RoomServices {
    constructor () {}

    listOfRoom (req, res) {
        Room.aggregate([
            // unwinds
            {
                $unwind: "$online_list"
            },

            // lookups
            {
                $lookup: {
                    from: "users",
                    localField: "online_list",
                    foreignField: "_id",
                    as: "online_users"
                }
            },

            {
                $unwind: "$online_users"
            },

            // group
            {
                $group: {
                    _id: "$_id",
                    name: {$first: "$name"},
                    timestamp: {$first: "$timestamp"},
                    online_users: {
                        $push: "$online_users"
                    }
                }
            }
        ]).exec((err, docs) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            // remove password and __v from results
            docs.map(item => {
                for(let i of item.online_users) {
                    delete i.password;
                    delete i.__v;
                }

                return item;
            });

            systemService.responseGenerator(req, res, true, docs, 20000);
        })
    }

    createRoom (req, res) {
        var room;
        room = new Room({
            name: req.body.name,
            available: true,
            online_list: req.body.users
        });

        room.save((err, result) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            delete result._doc.__v;

            systemService.responseGenerator(req, res, true, result, 20000);
        })
    }

    addUserToRoom (req, res) {
        const room = mongoose.Types.ObjectId(req.body.room_id);
        const user = mongoose.Types.ObjectId(req.body.user_id);

        Room.update({_id: room}, {$addToSet: {online_list: user}}, (err, doc) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            systemService.responseGenerator(req, res, true, doc, 20000);
        });
    }

    removeUserFromRoom (req, res) {
        const room = mongoose.Types.ObjectId(req.body.room_id);
        const user = mongoose.Types.ObjectId(req.body.user_id);

        Room.update({_id: room}, {$pull: {online_list: user}}, (err, doc) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            systemService.responseGenerator(req, res, true, doc, 20000);
        })
    }
}

exports.RoomServices = RoomServices;