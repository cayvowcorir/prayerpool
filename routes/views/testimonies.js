var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'testimonies';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		category: []
	};



	// Load all categories
	view.on('init', function(next) {
		// keystone.list('PostCategory').model.findOne({key: 'testimonies'}).exec(function(err, results){

		// 	locals.category.id=results.id;
		// 	locals.data.categories = results;
		// });

		// keystone.list('Post').model.count().where('categories').in(locals.category.id).exec(function(err, count) {
		// 	locals.data.categories.postCount = count;
		// 	next(err);
		// });
		

		keystone.list('PostCategory').model.findOne({key: 'testimonies'}).exec(function(err, results) {			

			locals.data.category = results;

			keystone.list('Post').model.count().where('categories').equals(locals.data.category.id).exec(function(err, count) {
				locals.data.category.postCount = count;
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');
		
		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('testimonies');
	
};
