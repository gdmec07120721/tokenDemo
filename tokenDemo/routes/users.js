var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/config');
var router = express.Router();

const passport = require('../config/passport')

/*const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  
});

router.post('/sign', (req, res, next) => {
	if(!req.body.name || !req.body.pass){
		res.json({
			rescode: 001,
			resmsg: '用户名和密码不能为空！',
			resresult: []
		});
	} else {
		User.findOne({
			name: req.body.name
		},(err, user) => {
			if (err) {
				return next(err); 
			}
			if (user) {
				res.json({
					rescode: 002,
					resmsg: '用户已存在！',
					resresult: []
				});
			}else {
				bcrypt.genSalt(10, (err, salt) => {
					if (err) {
						return next(err); 
					}
					bcrypt.hash(req.body.pass, salt, (err, hash) => {
						if (err) {
							return next(err); 
						}

						var newUser = new User({
							name: req.body.name,
							password: hash
						});

						newUser.save((err, newuser) => {
							if (err) {
								res.json({
									rescode: 003,
									resmsg: '注册失败！',
									resresult: []
								})
							}

							res.json({
								rescode: 0,
								resmsg: '注册成功！',
								resresult: [{
									name: newuser.name,
									token: newuser.token
								}]
							});
						})
					})
				})
			}			
		})
	}

})

router.post('/login', (req, res, next) => {
	if(!req.body.name || !req.body.pass){
		res.json({
			rescode: 001,
			resmsg: '用户名和密码不能为空！',
			resresult: []
		});
	} else {
		User.findOne({
			name: req.body.name
		},(err, user) => {
			
			if (err) {
				return next(err); 
			}

			if (!user) {
				console.log('user')
				res.json({
					rescode: 002,
					resmsg: '用户不存在！',
					resresult: []
				});


			}else if(user) {
				bcrypt.compare(req.body.pass, user.password, (err, isMath) => {
					if (err) {
						return next(err); 
					}
					if (isMath && !err) {
						let token = jwt.sign({name: user.name}, config.secret, {
							expiresIn: 10080  //token到期的时间
						});
						user.token = token;
						user.save(err => {
							if (err) {
								res.json({
									rescode: 003,
									resmsg: err,
									resresult: []
								});
							}
							res.json({
								rescode: 0,
								resmsg: '登录成功！',
								resresult: [{
									name: user.name,
									token: user.token
								}]
							});
						})
					} else {
						res.json({
							rescode: 004,
							resmsg: '密码错误！请输入正确密码!',
							resresult: []
						});
					}
				})
			} 			
		})
	}
})

router.post('/info', passport, (req, res, next) => {
	if (req.user) {
		res.json({
			rescode: 0,
			resmsg: '',
			resresult: [{
				name: req.user.name,
				token: req.user.token
			}]
		});		
	}
});

router.get('/logout', passport, function(req, res, next) {
    if (req.user) {
    	User.findOneAndUpdate('token', {token: ''}, (err, user) => {
    		if (err) {
				console.log(err)
			}
    		if (user) {
				res.json({
					rescode: 0,
					resmsg: '退出成功！',
					resresult: []
				});	
    		}
    	})
    }
});


module.exports = router;
