var Jinx;
(function(base) {
	"use strict";

	var partials = '/public/app/partials/';
	
	base.controller = angular.module('appControllers', []);
	
	base.app = angular.module('LiteAdmin',[
		'ngRoute',
		'appControllers'
	]);
	
	base.app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/home', {
			templateUrl: partials + 'home.html',
			controller: 'HomeCtrl'
		}).
		when('/table/:TName', {
			templateUrl: partials + 'table-detail.html',
			controller: 'DisplayCtrl'
		}).
		otherwise({
			redirectTo: '/home'
		});
	}]);
  
})(Jinx || (Jinx = {}));