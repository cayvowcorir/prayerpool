var keystone = require('keystone');
var user=keystone.list('User');

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
		view.render('/');
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



