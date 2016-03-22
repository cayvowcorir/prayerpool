var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		prayeritems: []
	};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('init', function(next) {
		
		var q = keystone.list('PrayerRequest').model.find();
		
		q.exec(function(err, result) {
			locals.data.prayeritems = result;
			next(err);
		});
		
	});

	view.on('post', {addToCart: 'true'}, function(next){
		var q = keystone.list('PrayerRequest').model.findOne({
			id:req.body.id
		});
		q.exec(function(err, result) {
			var prayerCart=keystone.list('PrayerCart');
			new prayerCart.model({itemName: result.title, completed: false}).save();
			prayerCart._req_user=req.user;
			next(err);
		});

		

		var prayerCart=keystone.list('PrayerCart');
		

	});
	
	// Render the view
	if(!req.user){
		res.redirect('/landing');
	}
	else{
		view.render('index');
	};

};
exports.do=function(){
	console.log('ss');
}
