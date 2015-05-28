var Jinx;
(function(base) {
	"use strict";

	base.controller.controller('TableCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		$scope.sql = {
			current: 'SELECT * FROM ' + $routeParams.TName + ';',
			run: function() {
				base.query($http, this.current).success(function(res) {
					console.log(res);
				});
			},
			result: [],
		}
		
		$scope.sql.run();
	}]);
	
})(Jinx || (Jinx = {}));