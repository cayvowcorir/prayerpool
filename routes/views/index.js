var keystone = require('keystone');
var prayeritems=keystone.list('PrayerRequest');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		prayeritems: []
	};
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	prayeritems.model.find().exec(function(err, results){
		locals.data.prayeritems=results;
	});
	keystone.redirect('/contact');
	// Render the view
	if(!req.user){
		res.redirect('/landing');
	}
	else{
		view.render('index');

	}
	
};
