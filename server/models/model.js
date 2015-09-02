var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: String,
	date: String,
});

mongoose.model('Customer', CustomerSchema);

var OrderSchema = new mongoose.Schema({
	customer_name: String,
  	product: String,
  	quantity: Number,
  	order_date: String
});

mongoose.model('Order', OrderSchema);

var ProductSchema = new mongoose.Schema({
	product_name: String,
  	product_img_url: String,
  	product_description: String,
  	product_price: Number,
  	product_quantity: Number,
  	product_date: String
});

mongoose.model('Product', ProductSchema);
