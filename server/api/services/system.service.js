/*
* This module has multiple classes for service works
* */

const constants = require('../constants').constants;
const jwt = require('jsonwebtoken');
const config = require('../../config').CONFIG;

class SystemServices {
    constructor () {
        this.response = {};
    }

    responseGenerator (req, res, success, data, code) {
        if (!success) {
            this.response.success = false;
            this.response.code = code;
            this.response.message = constants[code];
            this.response.data = data;
        } else {
            this.response.success = true;
            this.response.code = 20000;
            this.response.message = null;
            this.response.data = data;
        }

        res.status(200).json(this.response);
    }

    tokenGenerator (data) {
        var token = jwt.sign(data, config.jwt_code_word, { expiresIn: config.jwt_session_time});
        return token;
    }

    tokenValidator (token) {
        try {
            var decoded = jwt.verify(token, config.jwt_code_word);
            return {
                success: true,
                data: decoded
            };
        } catch(err) {
            if (err.name == 'TokenExpiredError') {
                return {
                    success: false,
                    code: 20003
                }
            }
            else if (err.name == 'JsonWebTokenError') {
                return {
                    success: false,
                    code: 20004
                }
            }
        }
    }
}

exports.SystemServices = SystemServices;