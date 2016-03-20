var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    if (req.method == 'GET') {
        view.render('calendar');
    }

    if(!req.user){
		res.redirect('/landing');
	}
	else{
		view.render('index');

	}

};
