var Jinx;
(function(base) {
	"use strict";

	base.controller.controller('HomeCtrl', function ($scope, $http) {
		$scope.name = 'dave';
	});
	
	base.controller.controller('DisplayCtrl', function ($scope, $http) {
		$scope.name = 'bob';
	});
	
})(Jinx || (Jinx = {}));