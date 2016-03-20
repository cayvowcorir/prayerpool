var keystone = require('keystone');
var prayer=keystone.list('PrayerRequest');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'newrequest';
	if(req.method=='POST'){
		var NewPrayerRequest=new prayer.model();
		NewPrayerRequest.set({title:req.body.title, 
			description: req.body.description, 
			scope: req.body.scope, 
			anonymous: req.body.anonymous});
		NewPrayerRequest._req_user = req.user;
		NewPrayerRequest.save();

	}
	
	// Render the view
	if(!req.user){
		res.redirect('/landing');
	}
	else{
		view.render('newrequest');

	}
	

};

