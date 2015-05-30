var Jinx;
(function(base) {
	"use strict";
	
	var tabs = [
		{name:'Show', url:'/show/:database/:TName', icon:'fa fa-list'},
		{name:'Structure', url:'/structure/:database/:TName', icon:'fa fa-link'},
		{name:'Sql', url:'/sql/:database', icon:'fa fa-code'},
		{name:'Rechercher', url:'/rechercher/:database/:TName', icon:'fa fa-search'},
		{name:'Insert', url:'/insert/:database/:TName', icon:'fa fa-indent'},
		{name:'Export', url:'/export/:database/:TName', icon:'fa fa-sign-out'},
		{name:'Import', url:'/import/:database/:TName', icon:'fa fa-sign-in'},
	];
	
	base.controller.directive('jinxTab', ['$route', function($route) {
		var link = function(scope, element, attrs) {
			scope.tab = {
				list: tabs,
				path: $route.current.$$route.originalPath,
				format: function(url) {
					var p = $route.current.params;
					for (var i in p) {
						url = url.replace(':' + i, p[i]);
					}
					return (url);
				}
			};
			console.log($route);
		}
		
		return {
			restrict: 'E',
			templateUrl: '/public/app/partials/tabs.html',
			link: link,
		};
	}]);
	
})(Jinx || (Jinx = {}));