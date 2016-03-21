var keystone = require('keystone');
var session = require('./session');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	
	
	// Set locals
	locals.section = 'login';
	
	if (req.method === 'POST') {
		view.on({ username: 'Kevin' }, function(next) {
	      console.log('Hello Admin!');
	      next();
	  });

		if (!keystone.security.csrf.validate(req)) {
			req.flash('error', {detail:'There was an error with your request, please try again.'});
			return view.render('signin');
		}

		if (!req.body.email || !req.body.password) {
			req.flash('error', {detail: 'Please enter your email address and password.'});
			return view.render('signin');
		}

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
			var message = (err && err.message) ? err.message : 'Sorry, that email and password combination are not valid.';
			req.flash('error', {detail:message} );
			view.render('signin');
		};

		session.signin(req.body, req, res, onSuccess, onFail);

	} else {
		view.render('signin');
	}

	
	
	// Render the view
	
	
};
