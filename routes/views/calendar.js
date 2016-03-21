var keystone = require('keystone');
exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section="prayer_calender";
    if (req.method == 'GET') {
        if (!req.user) {
            res.redirect('/landing');
        } else {
            view.render('calendar');
        }

    }
    console.log(req.user);

};
