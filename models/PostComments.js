var keystone = require('keystone');
var Types = keystone.Field.Types;



var PostComments = new keystone.List('PostComments', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PostComments.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages }
});

PostComments.register();
