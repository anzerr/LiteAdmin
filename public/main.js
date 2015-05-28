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
  
  
	// FUNC
	base.query = function($http, q) {
		return ($http({method: 'post', url: '/', data: {c: 'database', a: 'query', p: {query: q}}}));
	}
  
})(Jinx || (Jinx = {}));