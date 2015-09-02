        var myAppModule = angular.module('myApp', ['ngRoute']);

        myAppModule.config(function ($routeProvider) {
          $routeProvider
            .when('/',{
                templateUrl: 'partials/main.html'
            })
            .when('/products',{
                templateUrl: 'partials/products.html'
            })
            .when('/orders',{
                templateUrl: 'partials/orders.html'
            })
            .when('/customers',{
                templateUrl: 'partials/customers.html'
            })            
            .otherwise({
              redirectTo: '/'
            });
        });

        myAppModule.factory('customerFactory', function ($http){
            var customers = [];
            var factory = {};

            factory.getCustomers = function(callback) {
                $http.get('/customers').success(function(output) {
                    customers = output;
                    callback(customers);
                })
            }

            factory.addCustomer = function (info){
                var data = {name: info.name, date: Date.now()};
                $http.post('/add_customer', data).success(function(output) {
                })
            }

            factory.checkCustomer = function(newCustomerName) {
                for (var i = 0; i < customers.length; i++) {
                    if (customers[i].name == newCustomerName) {
                        return true;
                    }
                }
                return false;
            }
            return factory;
        });

        myAppModule.controller('customersController', function ($scope, customerFactory){
            $scope.customers = [];

            customerFactory.getCustomers(function (data){
                $scope.customers = data;
            })

            $scope.addCustomer = function(data) {
                if(!customerFactory.checkCustomer($scope.newCustomer.name)) {
                    $('.error').addClass('hide');
                    customerFactory.addCustomer($scope.newCustomer);
                } else if($scope.newCustomer.name == null) {
                    $('.blank').removeClass('hide');
                }
                else {
                    $('.error').removeClass('hide');
                }
            }

        })

        myAppModule.factory('orderFactory', function ($http){
            var orders = [];
            var factory = {};

            factory.getOrders = function(callback) {
                $http.get('/orders').success(function(output) {
                    orders = output;
                    callback(orders);
                })
            }

            factory.addOrder = function(info) {
                var data = {customer_name: info.customer_name, product: info.product, quantity: info.quantity, order_date: Date.now()};
                console.log(data)
                $http.post('/add_order', data).success(function(output) {
                    console.log('Order received!')
                })
            }

            factory.removeOrder = function(orderName){
                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].name == orderName) {
                        orders.splice(i, i+1);
                    }
                }
            }

            factory.checkOrder = function(newOrderName) {
                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].name == newOrderName) {
                        return true;
                    }
                }
                return false;
            }
            return factory
        });

        myAppModule.controller('ordersController', function ($scope, orderFactory){
            $scope.orders = [];

            orderFactory.getOrders(function (data){
                $scope.orders = data;
            })

            $scope.addOrder = function() {
                    orderFactory.addOrder($scope.newOrder);
            }

            $scope.removeOrder = function(orderName) {
                orderFactory.removeOrder(orderName);
            }
        })

        myAppModule.factory('productFactory', function ($http){
            var products = [];
            var factory = {};

            factory.getProducts = function(callback) {
                $http.get('/products').success(function(output) {
                    products = output;
                    callback(products);
                })
            }

            factory.addProduct = function(info) {
                var data = {product_name: info.product_name, product_img_url: info.product_img_url, product_description: info.product_description, product_price: info.product_price, product_quantity: info.product_quantity, product_date: Date.now()};
                console.log(data)
                $http.post('/add_product', data).success(function(output) {
                    console.log('Product added!')
                })
            }

            factory.removeProduct = function(ProductName){
                for (var i = 0; i < products.length; i++) {
                    if (products[i].name == ProductName) {
                        products.splice(i, i+1);
                    }
                }
            }

            factory.checkProduct = function(newProductName) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].name == newProductName) {
                        return true;
                    }
                }
                return false;
            }
            return factory
        });

        myAppModule.controller('productsController', function ($scope, productFactory){
            $scope.products = [];

            productFactory.getProducts(function (data){
                $scope.products = data;
            })

            $scope.addProduct = function() {
                productFactory.addProduct($scope.newProduct);
            }

            $scope.removeProduct = function(productName) {
                productFactory.removeProduct(productName);
            }
        })

        myAppModule.controller('productsMainController', function ($scope, productFactory){
            $scope.filteredProducts = [];
            $scope.products = [];    
            $scope.currentPage = 1;
            $scope.numPerPage = 5;
            $scope.maxSize = 10;                
            

            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
                
                $scope.filteredProducts = $scope.products.slice(begin, end);


                console.log('Filtered Products: '+$scope.filteredProducts);
                console.log('Products: '+$scope.products);
                console.log('Total Products: '+$scope.products.length);
                console.log('Filtered Begin: '+begin+", Filtered End: "+end);
            });

            productFactory.getProducts(function (data){
                $scope.products = data;
            })
        })

