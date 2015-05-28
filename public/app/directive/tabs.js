var Jinx;
(function(base) {
	"use strict";
	
	var tabs = [
		{name:'Show', url:'/show/:database/:TName'},
		{name:'Structure', url:'/structure/:database/:TName'},
		{name:'Sql', url:'/sql/:database/:TName'},
		{name:'Rechercher', url:'/rechercher/:database/:TName'},
		{name:'Insert', url:'/insert/:database/:TName'},
		{name:'Export', url:'/export/:database/:TName'},
		{name:'Import', url:'/import/:database/:TName'},
	];
	
	base.controller.directive('jinxTab', ['$route', function($route) {
		var link = function(scope, element, attrs) {
			scope.tab = {
				list: tabs,
				path: $route.current.$$route.originalPath,
			};
		}
		
		return {
			restrict: 'E',
			templateUrl: '/public/app/partials/tabs.html',
			link: link,
		};
	}]);
	
})(Jinx || (Jinx = {}));