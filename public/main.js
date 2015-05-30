isset = function(a) { return ((typeof(a) !== 'undefined' && a !== null) ? true : false); }

var Jinx;
(function(base) {
	"use strict";

	var partials = '/public/app/partials/';
	
	base.controller = angular.module('appControllers', [
		'ngCookies',
	]);
	
	base.app = angular.module('LiteAdmin',[
		'ngRoute',
		'ngCookies',
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
			controller: 'StructureCtrl'
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
			controller: 'StructureCtrl'
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

	
	// FUNC
	base._connection = {
		s: {
			host: 'localhost',
			user: 'root',
			password: '',
			port: '',
		},
		error: [],
		init: false,
		tested: false,
		Init: function($cookies, $http) {
			if (this.init) {
				return (true);
			}
			var self = this;
			try {
				self.s = JSON.parse($cookies.sqlConfig);
			} catch (e) {
				$cookies.sqlConfig = JSON.stringify(self.s);	
			}
			this.init = true;
			this.Test($http);
		},
		Save: function($cookies, $http) {
			$cookies.sqlConfig = JSON.stringify(this.s);
			this.Test($http);
		},
		Test: function($http) {
			var self = this;
			self.tested = false;
			base.query($http, 'SHOW DATABASES;').success(function(res) {
				self.error = res.error;
				self.tested = true;
			});
		},
		Get: function() {
			if (!this.init) {
				return ({});
			}
			return ({
				sql: 'mysql:host=' + this.s.host + ((this.s.port != '') ? ';port=' + this.s.port : ''),
				user: this.s.user,
				pwd: this.s.password,
			});
		}
	}
	
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
  
	base.escapeRegExp = function(str) {
		return (str+'').replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
			switch (char) {
				case "\0":
					return "\\0";
				case "\x08":
					return "\\b";
				case "\x09":
					return "\\t";
				case "\x1a":
					return "\\z";
				case "\n":
					return "\\n";
				case "\r":
					return "\\r";
				case "\"":
				case "'":
				case "\\":
				case "%":
					return "\\"+char;
			}
		});
	}
  
	base.query = function($http, q, d) {
		return ($http({method: 'post', url: '/', data: {c: 'database', a: 'query', p: {connect: base._connection.Get(), query: q, database: (isset(d)) ? d : ''}}}));
	}
  
})(Jinx || (Jinx = {}));