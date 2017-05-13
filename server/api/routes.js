const config = require('../config').CONFIG;
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: '*:*'});

// Import services
const UserServices = require('./services/user.services').UserServices;
const userServices = new UserServices();

const RoomServices = require('./services/room.services').RoomServices;
const roomService = new RoomServices();

const SystemService = require('./services/system.service').SystemServices;
const systemService = new SystemService();

const PrivateService = require('./services/private.services').PrivateServices;
const privateService = new PrivateService();

const MessageService = require('./services/message.service').MessageService;
const messageService = new MessageService();

const constants = require('./constants').constants;

server.listen(config.port, err => {
    if (err)
        console.log(`Something went wrong, then app try to use port ${config.port}`);
    else
        console.log(`Express listening on port ${config.port}!`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
    let paths = [
        '/',
        '/api/public/v1/user/auth',
        '/api/public/v1/user/init'
    ];

    if (paths.indexOf(req.path) > -1)
        return next();

    let decoded = systemService.tokenValidator(req.headers.authorization);
    if (decoded.success) {
        req.USER_INFO = decoded.data;
        next();
    } else {
        res.status(401).json({success: false, code: decoded.code, message: constants[decoded.code]});
    }
});

app.get('/', (req, res) => {
    systemServices.responseHandler(req,res,true, null, 20000);
});

app.post('/api/public/v1/user/auth', userServices.userAuth); // this method authorize registered user
app.get('/api/public/v1/user/validate', userServices.userValidateToken); // // this method validate token from anonim user
app.get('/api/public/v1/user/list', userServices.usersList); // this methor return list of all registered users for private chats
app.put('/api/public/v1/user/init', userServices.userInit); // this method registrate new user

app.get('/api/public/v1/room/list', roomService.listOfRoom); // this method return list of rooms
app.put('/api/public/v1/room/create', roomService.createRoom); // this method create new room
app.post('/api/public/v1/room/user/add', roomService.addUserToRoom); // this method add users to room
app.delete('/api/public/v1/room/user/remove', roomService.removeUserFromRoom); // this method remove users from room

app.get('/api/public/v1/private/list', privateService.listOfPrivateChats); // this method return list of private messages
app.put('/api/public/v1/private/create', privateService.createPrivateChat); // this method create private chat

app.put('/api/public/v1/message/create', messageService.createMessage); // this method send message
// app.get('/api/public/v1/message/list', messageService.getListOfMessages); // this method return list of messages in room or private chat

io.on('connection', (socket) => {
    let id = socket.request._query.chat; // socket.io request params, it maybe private chat or room ID

    socket.join(id.toString()); // join to socket room

});

exports.io = io; // export socket as global module

// app.listen(config.port, () => {
//     console.log(`Express listening on port ${config.port}!`)
// });