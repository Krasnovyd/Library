"use strict";

/* App Module */

var app = angular.module('libraryApp', [
		'ngRoute',
		'books',
		'menu',
		'templates'
	]);

	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/books', {
					templateUrl: 'pages/books.html'
				}).
				when('/authors', {
					templateUrl: 'pages/authors.html',
				}).
				otherwise({
					redirectTo: '/books'
				});
	}]);
