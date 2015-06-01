var Jinx;
(function(base) {
	"use strict";

	var init = false;
	
	base.controller.controller('HomeCtrl', ['$scope', '$routeParams', '$http', '$timeout', '$cookies', function($scope, $routeParams, $http, $timeout, $cookies) {
		
		$scope.config = base._connection;
		
		$scope.sql = {
			Save: function() {
				base._connection.Save($cookies, $http);
			}
		}
		
		base._connection.Init($cookies, $http);
		$timeout(function() {
			$('.jinxloadPage').css('opacity', '1');
		}, 250);
	}]);
	
})(Jinx || (Jinx = {}));