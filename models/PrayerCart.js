var keystone = require('keystone');
var Types = keystone.Field.Types;

var PrayerCart = new keystone.List('PrayerCart');
PrayerCart.add({
	itemName: { type: String, required: true, initial:false },
	dueDate: { type: Date },
	completed: { type: Types.Boolean }
});

PrayerCart.register();
