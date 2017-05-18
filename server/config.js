/*
* Configuration file with environments, links to database and localhost ports
* */

let host;
let port;
let db;

switch (process.env.ENVIRONMENT) {
    case 'PROD':
        host = '127.0.0.1'; // for deploying to virtual machine
        port = process.env.PORT || 3000;
        db = 'mongodb://admin:JOoQi02JTMo7EdiU@ds137441.mlab.com:37441/heroku_21dhnd00';
        break;
    case 'DEV':
        host = '127.0.0.1';
        port = 3000;
        db = 'mongodb://localhost:27017/owlschats';
        break;
    case 'TEST':
        host = '127.0.0.1';
        port = 3000;
        db = 'mongodb://localhost:27017/owlschatsTest';
        break;
    default:
        host = '127.0.0.1';
        port = 3000;
        db = 'mongodb://localhost:27017/owlschats';
        break;
}

exports.CONFIG = {
    host: host,
    port: port,
    mongo: db,
    jwt_code_word: '2GuefcFPc08DshMy',
    jwt_session_time: '30d'
}
