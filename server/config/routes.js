var customers = require('../controllers/controller.js');
var orders = require('../controllers/controller.js');
var products = require('../controllers/controller.js');

module.exports = function(app) {

	app.get('/customers', function (req, res) {
	    customers.showCustomer(req, res);
	})

	app.post('/add_customer', function (req, res) {
		customers.addCustomer(req, res);
	})

	app.get('/:id/remove_customer', function (req, res){
		customers.removeCustomer(req, res);
	})

	app.get('/orders', function (req, res) {
	    orders.showOrder(req, res);
	})

	app.post('/add_order', function (req, res) {
		orders.addOrder(req, res);
	})

	app.get('/:id/delete_order', function (req, res){
		orders.deleteOrder(req, res);
	})

	app.get('/products', function (req, res) {
	    products.showProduct(req, res);
	})

	app.post('/add_product', function (req, res) {
		products.addProduct(req, res);
	})

	app.get('/:id/delete_product', function (req, res){
		products.deleteProduct(req, res);
	})
};



