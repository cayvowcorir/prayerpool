var keystone = require('keystone');
var user=keystone.list('User');
var session=require('./session');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	
	// Set locals
	locals.section = 'signup';

	if(req.method==='POST'){
		var newUser=new user.model();
		newUser.set({name:req.body.username, 
			email: req.body.email, 
			password: req.body.password});
		newUser.save();
		
		req.flash('success', {detail:'You have successfully created an account. Logging you in...'});
		var onSuccess = function (user) {

			if (req.query.from && req.query.from.match(/^(?!http|\/\/|javascript).+/)) {
				res.redirect(req.query.from);
			} else if ('string' === typeof keystone.get('signin redirect')) {
				res.redirect(keystone.get('signin redirect'));
			} else if ('function' === typeof keystone.get('signin redirect')) {
				keystone.get('signin redirect')(user, req, res);
			} else {
				res.redirect('/');
			}

		};

		var onFail = function (err) {
			var message = (err && err.message) ? err.message : 'An error occured.Please try loggin in.';
			req.flash('error', {detail:message} );
			view.render('signin');
		};

		session.signin(req.body, req, res, onSuccess, onFail);
	}
	else if(req.method==='GET'){
		if(req.user){
		res.redirect('/');
		}
		else{
			view.render('signup');

		}
	}

	
	
	
};



