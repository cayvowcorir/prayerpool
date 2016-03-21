var keystone = require('keystone');
var session = require('./session');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	
	
	// Set locals
	locals.section = 'signout';
	
session.signout(req, res, function() {

		if ('string' === typeof keystone.get('signout redirect')) {
			return res.redirect(keystone.get('signout redirect'));
		} else if ('function' === typeof keystone.get('signout redirect')) {
			return keystone.get('signout redirect')(req, res);
		} else {
			return res.redirect('/landing');
		}
	});
	// Render the view
	
	
};
