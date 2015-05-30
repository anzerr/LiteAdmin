var Jinx;
(function(base) {
	"use strict";

	base.controller.controller('StructureCtrl', ['$scope', '$routeParams', '$http', '$timeout', '$cookies', function($scope, $routeParams, $http, $timeout, $cookies) {
		$scope.sql = {
			current: 'SHOW COLUMNS FROM ' + $routeParams.TName + ';',
			run: function() {
				var self = this;
				if (self.ajax) {
					return (false);
				}
				self.ajax = true;
				base.query($http, base._query.add(self.current), $routeParams.database).success(function(res) {
					console.log(res);
					try {
						self.result = res
						self.tableName = (isset(self.result.info.table) && self.result.info.table != '') ? self.result.info.table : '';
						self.ajax = false;
					} catch (e) {
						console.log(e);
					}
				});
			},
			ajax: false,
			save: [],
			result: [],
			add: [],
			tableName: $routeParams.TName,
			databaseName: $routeParams.database,
			range: function(n) {
				return new Array(n);
			},
			editTable: function(key) {
				var elem = this.result.data[key], self = this;
				if (elem.edit == true) {
					this.updateRow(key);
				} else {
					var old = [];
					for (var i in elem) {
						old[i] = elem[i];
					}
					this.save[key] = old;
				}
				elem.edit = (elem.edit == true) ? false : true;
			},
			updateRow: function(key) {
				var self = this, a = '', b = 0, data = self.result.data;
				for (var i in self.result.name) {
					if (self.save[key][i] != self.result.data[key][i]) {
						b += 1;
					}
				}
				a = "ALTER TABLE " + self.tableName + " CHANGE " + self.save[key][0] + " " + data[key][0] + " " + data[key][1] + ((data[key][2] == "NO") ? ' NOT NULL': '') + ";"

				if (b != 0) {
					self.current = base._query.add(a);
					base.query($http, self.current, self.databaseName).success(function(res) {
						self.result.error = res.error;
						if (self.result.error.length == 0) {
							self.current = 'SHOW COLUMNS FROM ' + self.tableName + ';',
							$scope.sql.run();
						} else {
							self.result.data[key].edit = true;
						}
					});
				} else {
					self.result.error = [];
				}
			},
			addRow: function() {
				var self = this;
				var a = "ALTER TABLE " + self.tableName + " ADD " + self.add[0] + " " + self.add[1] + ((self.add[2] == "NO") ? ' NOT NULL': '') + ";"
				
				self.current = base._query.add(a);
				base.query($http, self.current, self.databaseName).success(function(res) {
					self.result.error = res.error;
					if (self.result.error.length == 0) {
						self.add = [];
						self.current = 'SHOW COLUMNS FROM ' + self.tableName + ';',
						$scope.sql.run();
					}
				});
			},
			removeRow: function(key) {
				var self = this;
				
				self.current = base._query.add("ALTER TABLE " + self.tableName + " DROP " + self.result.data[key][0]);
				base.query($http, self.current, self.databaseName).success(function(res) {
					self.result.error = res.error;
					if (self.result.error.length == 0) {
						self.current = 'SHOW COLUMNS FROM ' + self.tableName + ';',
						$scope.sql.run();
					}
				});
			},
			dropTalbe: function() {
				self.current = base._query.add("DROP Table " + self.tableName + ";");
				base.query($http, self.current, self.databaseName).success(function(res) {
					self.result.error = res.error;
					if (self.result.error.length == 0) {
						self.current = 'SHOW COLUMNS FROM ' + self.tableName + ';',
						$scope.sql.run();
					}
				});
			},
		}
		
		base._connection.Init($cookies, $http);
		$scope.sql.run();
		$timeout(function() {
			$('.jinxloadPage').css('opacity', '1');
		}, 250);
	}]);
	
})(Jinx || (Jinx = {}));