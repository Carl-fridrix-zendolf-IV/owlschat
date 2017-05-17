const mongoose = require('mongoose');
const SystemService = require('./system.service').SystemServices;

const systemService = new SystemService();
const Message = mongoose.model('Message');

const io = require('../routes');


class MessageService {
    constructor () {}

    createMessage (req, res) {
        let message = new Message({
            message: req.body.message,
            sender_name: req.USER_INFO.name,
            sender_type: req.USER_INFO.anonymous,
            sender_id: req.USER_INFO._id,
            chat_id: mongoose.Types.ObjectId(req.body.chat_id)
        });

        message.save((err, result) => {
            if (err)
                return systemService.responseGenerator(req, res, false, err.message, 50000);

            systemService.responseGenerator(req, res, true, result, 20000);
            io.io.to(req.body.chat_id.toString()).emit('NEW_MESSAGE', result);
        })
    }

    getListOfMessages (chat) {
        Message.find({chat_id: mongoose.Types.ObjectId(chat)}).exec((err, docs) => {
            io.io.to(chat).emit('MESSAGES_LIST', docs);
        })
    }
}

exports.MessageService = MessageService;