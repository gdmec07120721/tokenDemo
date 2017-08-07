/*const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;*/
var User = require('../models/user');
var config = require('./config');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log(req.headers['_session_token'])
    let token = req.headers['_session_token'];

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            console.log(decoded)
            if (err) {
                res.json({
                    rescode: 001,
                    resmsg: '身份已过期,请重新登录！',
                    resresult: []
                })
            }else{
                if (decoded) {
                    User.findOne({
                        token: token
                    }, (err, user) => {
                        res.json({
                            rescode: 0,
                            resmsg: '',
                            resresult: [{
                                name: user.name,
                                token: user.token
                            }]
                        })
                    });
                }
            }
        });
    }else{
        res.state(401).json({
            rescode: 401,
            resmsg: '用户不存在！',
            resresult: []
        })
        next();
    }
};