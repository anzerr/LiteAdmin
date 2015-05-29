isset = function(a) { return ((typeof(a) !== 'undefined' && a !== null) ? true : false); }

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
		when('/show/:database/:TName', {
			templateUrl: partials + 'table/show.html',
			controller: 'TableCtrl'
		}).
		when('/structure/:database/:TName', {
			templateUrl: partials + 'table/structure.html',
			controller: 'TableCtrl'
		}).
		when('/sql/:database/:TName', {
			templateUrl: partials + 'table/sql.html',
			controller: 'TableCtrl'
		}).
		when('/rechercher/:database/:TName', {
			templateUrl: partials + 'table/rechercher.html',
			controller: 'TableCtrl'
		}).
		when('/insert/:database/:TName', {
			templateUrl: partials + 'table/insert.html',
			controller: 'TableCtrl'
		}).
		when('/export/:database/:TName', {
			templateUrl: partials + 'table/export.html',
			controller: 'TableCtrl'
		}).
		when('/import/:database/:TName', {
			templateUrl: partials + 'table/import.html',
			controller: 'TableCtrl'
		}).
		otherwise({
			redirectTo: '/home'
		});
	}]);

	base._query = {
		_database:'',
		set:function(a) {
			this._database = a;
		},
		list:[],
		add:function(a, b) {
			this.list.push({q:a, d:(isset(b)) ? b : ''});
			return (a);
		},
	}
  
	// FUNC
	base.query = function($http, q, d) {
		return ($http({method: 'post', url: '/', data: {c: 'database', a: 'query', p: {query: q, database: (isset(d)) ? d : ''}}}));
	}
  
})(Jinx || (Jinx = {}));