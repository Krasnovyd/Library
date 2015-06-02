"use strict";

/* Menu Module */

var app = angular.module('menu', []);

	app.filter('hashUrl', [
		function(){
			return function(value){
				return '#' + value;
			}
		}
	]);

	app.controller('navController', [
		'$rootScope',
		'$location',
		function($rootScope, $location){
			var that = this;
			$rootScope.$on('$routeChangeSuccess', function () {
				var path = $location.path(), i;
				if(that.currentItem){
					that.currentItem.active = false;
				}
				for(i = 0; i < that.menu.length; i++){
					if(that.menu[i].url === path){
						that.currentItem = that.menu[i];
						that.currentItem.active = true;
						break;
					}
				}
			});

			this.menu = [
				{
					title: 'Books',
					url: '/books'
				},
				{
					title: 'Authors',
					url: '/authors'
				}
			];
		}
	]);