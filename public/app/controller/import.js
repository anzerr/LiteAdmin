var Jinx;
(function(base) {
	"use strict";

	var _cache = {
		file: {
			name:[],
			data:[],
		},
	};
	
	base.controller.controller('ImportCtrl', ['$scope', '$routeParams', '$http', '$timeout', '$cookies', function($scope, $routeParams, $http, $timeout, $cookies) {
		
		$scope.import = {
			file:_cache.file,
			ajax: false,
			result: [],
			runLock: false,
			sql: function(a) {
				var self = this;
				if (self.ajax) {
					return (false);
				}
				self.ajax = true;
				base.query($http, a, $routeParams.database).success(function(res) {
					try {
						if (res == 'null') {
							self.result = {
								error:["File broke the confines of the Json packet are you sure that a sql file?"],
							};
						} else {
							self.result = res
							self.tableName = (isset(self.result.info.table) && self.result.info.table != '') ? self.result.info.table : '';
						}
						self.ajax = false;
						self.runLock = true;	
					} catch (e) {
						console.log(e);
					}
				});
			},
			add: function(a) {
				this.file.name = a.name;
				this.file.data.push(a.data);
				console.log(this.file);
				$scope.$digest();
			},
			run: function(i) {
				this.runLock = false;
				this.sql(this.file.data[i].content);
			},
			remove: function(i) {
				this.file.data[i] = null;
			}
		}
		
		base._connection.Init($cookies, $http);
		$timeout(function() {
			$('.jinxloadPage').css('opacity', '1');
		}, 250);
	}]);
	
})(Jinx || (Jinx = {}));