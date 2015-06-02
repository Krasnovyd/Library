"use strict";

/* Templates */

var app = angular.module('templates', []);
	
	app.directive('titleHeader', ['$rootScope', '$location', function(){
		return {
			restrict: 'E',
			templateUrl: 'templates/title-header.html',
			controller: function($rootScope, $location){
				this.name = $location.path().slice(1).toUpperCase();
			},
			controllerAs: "header"
		};
	}]);