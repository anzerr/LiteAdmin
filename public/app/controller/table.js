var Jinx;
(function(base) {
	"use strict";

	base.controller.controller('TableCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
		$scope.sql = {
			current: 'SELECT * FROM ' + $routeParams.TName + ';',
			run: function() {
				var self = this;
				base.query($http, this.current, $routeParams.database).success(function(res) {
					console.log(res);
					try {
						self.result = res
						self.page = 0;
						self.max = Math.ceil(res.data.length / self.display);
					} catch (e) {
						console.log(e);
					}
				});
			},
			result: [],
			display: 25,
			page: 0,
			max: 0,
			setDisplay: function(n) {
				this.display = n;
				this.max = (this.result.data.length / this.display);
			},
			editTable: function(key) {
				var elem = this.result.data[key];
				if (elem.edit == true) {
					console.log("save to server");
				}
				elem.edit = (elem.edit == true) ? false : true;
			},
			getNumber: function() {
				var tmp = [], p = (this.page * this.display);
				for (var i = p; i < p + this.display; i++) {
					if (this.result.length == 0 || i < this.result.data.length) {
						tmp.push(i);
					}
				}
				return (tmp);
			},
			range: function(n) {
				return new Array(n);
			}
		}
		
		$scope.sql.run();
	}]);
	
})(Jinx || (Jinx = {}));