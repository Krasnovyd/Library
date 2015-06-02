"use strict";

/* Books */

var app = angular.module('books', ['ui.bootstrap']);
	
	app.factory('BooksService', ["$http", "$rootScope", function($http, $rootScope){
		var	books;

		if(localStorage.getItem('books') !== null){
			books = JSON.parse(localStorage.getItem('books'));
		} else {
			books = [];
			$http.get('json/books.json').success(function(data) {
				books = data;
				$rootScope.$emit("loadJson", data);
				localStorage.setItem('books', JSON.stringify(data));
			});
		}

		return {
			set: function(){
				localStorage.setItem('books', JSON.stringify(books));
			},
			get: function(){
				return books;
			}
		};
	}])

	app.controller('BookController', ["$scope", "$modal", "BooksService", "authorStorage", "$rootScope", function($scope, $modal, BooksService, authorStorage, $rootScope){
		var that = this;
		this.filter = authorStorage.getName();
		this.books = BooksService.get();

		$rootScope.$on('loadJson', function(event, message){
			that.books = message;
		});

		this.remove = function(item, index){
			that.books.splice(index, 1);
			BooksService.set(that.books);
		};

		this.open = function(data) {
			var modalInstance = $modal.open({
				templateUrl: 'templates/modal.html',
				controller: function ($scope, $modalInstance, id) {
					$scope.book = id || {
						"name": "",
						"author": "",
						"description": "",
						"rating": ""
					};

					$scope.save = function() {
						if(!id)
							that.books.push($scope.book);
						BooksService.set(that.books);
						$modalInstance.dismiss('cancel');
					};

					$scope.cancel = function() {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					id: function() {
						return data;
					}
				}
			});
		};
	}]);

	app.controller('AuthorsController', ['$rootScope', 'BooksService', 'authorStorage', function($rootScope, BooksService, authorStorage){
		var that = this;
		this.books = BooksService.get();

		$rootScope.$on('loadJson', function(event, message){
			that.books = message;
		});

		this.gotoBooks = function(author){
			authorStorage.setName(author);
		};
	}]);

	app.service('authorStorage', function(){
		var author = "";
		return {
			setName: function(name){
				author = name;
			},
			getName: function(){
				return author;
			}
		}
	});

	app.filter('unique', function() {
		return function(collection, keyname) {
			var output = [], 
				keys = [];

			angular.forEach(collection, function(item) {
				var key = item[keyname];
				if(keys.indexOf(key) === -1) {
					keys.push(key);
					output.push(item);
				}
			});
			return output;
		};
	});