const mongoose = require('mongoose');
const SystemService = require('./system.service').SystemServices;

const systemService = new SystemService();
const Message = mongoose.model('Message');


class MessageService {
    constructor () {}

    createMessage (req, res) {
        let message = new Message({
            message: req.body.message,
            sender_name: req.USER_INFO.name,
            sender_id: mongoose.Types.ObjectId(req.USER_INFO._id),
            chat_id: req.body.chat_id
        });

        message.save((err, result) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            return systemService.responseGenerator(req, res, true, result, 20000);
        })
    }

    getListOfMessages (chat) {
        Message.aggregate([
            // matches
            {
                $match: {chat_id: mongoose.Types.ObjectId(chat)}
            },

            // unwinds
            {
                $unwind: "$sender_id"
            },

            // lookups
            {
                $lookup: {
                    from: "users",
                    localField: "sender_id",
                    foreignField: "_id",
                    as: "sender"
                }
            },

            {
                $unwind: "$sender"
            },

            {
                $group: {
                    _id: "$_id",
                    sender: {
                        $first: "$sender"
                    }
                }
            }
        ]).exec((err, docs) => {
            console.log(docs);
        })
    }
}

exports.MessageService = MessageService;