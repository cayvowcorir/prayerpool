var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var NewPrayerRequest = new keystone.List('PrayerRequest', {
	track: true,
	defaultSort: '-createdAt'
});

NewPrayerRequest.add({
	title: { type: String },
	description: { type: String },
	scope: { type: Types.Select, options: 'public, group, individual', default: 'public'},
	anonymous: { type: String }
});

NewPrayerRequest.register();
