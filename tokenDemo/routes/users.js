var express = require('express');
var bcrypt = require('bcrypt')
var User = require('../models/user');
var router = express.Router();



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
									pass: newuser.password,
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
				res.json({
					rescode: 002,
					resmsg: '用户不存在！',
					resresult: []
				});
			}else {
				bcrypt.compare(req.body.pass, user.password, (err, isMath) => {
					if (err) {
						return next(err); 
					}
					if (isMath && !err) {

					}
				})
			}			
		})
	}

	res.send('respond with a resource');
})

module.exports = router;
