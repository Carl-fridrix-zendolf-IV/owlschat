/*
* Configuration file with environments, links to database and localhost ports
* */

let host;
let port;
let db;

switch (process.env.ENVIRONMENT) {
    case 'PROD':
        host = '127.0.0.1'; // for deploying to virtual machine
        port = process.env.port;
        db = 'mongodb://localhost:27017/owlschats';
        break;
    case 'DEV':
        host = '127.0.0.1';
        port = 3000;
        db = 'mongodb://localhost:27017/owlschats';
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
