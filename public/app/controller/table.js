var Jinx;
(function(base) {
	"use strict";

	base.controller.controller('TableCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		$scope.sql = {
			current: 'SELECT * FROM ' + $routeParams.TName + ';',
			run: function() {
				base.query($http, this.current, $routeParams.database).success(function(res) {
					console.log(res);
					try {
						$scope.sql.result = JSON.stringify(res);
					} catch (e) {
						console.log(e);
					}
				});
			},
			result: [],
		}
		
		$scope.sql.run();
	}]);
	
})(Jinx || (Jinx = {}));