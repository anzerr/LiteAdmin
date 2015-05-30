var Jinx;
(function(base) {
	"use strict";

	base.controller.controller('TableCtrl', ['$scope', '$routeParams', '$http', '$timeout', '$cookies', function($scope, $routeParams, $http, $timeout, $cookies) {
		$scope.sql = {
			current: 'SELECT * FROM ' + $routeParams.TName + ';',
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
						self.max = Math.ceil(res.data.length / self.display);
						self.page = Math.min(self.page, self.max);
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
			display: 25,
			page: 0,
			max: 0,
			tableName: $routeParams.TName,
			databaseName: $routeParams.database,
			setDisplay: function(n) {
				this.display = n;
				this.max = (this.result.data.length / this.display);
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
					this.BuildWhere(key, function() {
						elem.edit = (elem.edit == true) ? false : true;
					});
				}
				if (isset(this.result.info.pkey)) {
					elem.edit = (elem.edit == true) ? false : true;
				}
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
			},
			getSize: function() {
				var size = 0, pow = 1, tmp = 0, num = 1;
				while (pow < this.max) {
					pow = pow * 10;		
					size += (26 + (8 * num)) * (pow - tmp);
					tmp = pow - 1;
					num += 1;
				}
				return (size);
			},
			getPosX: function() {
				var cur = Math.max(this.page, 0), size = 0, pow = 1, tmp = 0, num = 1;
				while (pow < cur) {
					pow = pow * 10;
					size += (26 + (8 * num)) * (Math.min(pow - 1, cur) - tmp);
					tmp = pow - 1;
					num += 1;
				}
				return (size - ($('#jinxPage').width() / 2));
			},
			BuildWhere: (function() {
				
				var format = function(key, self) {
					var tmp = self.save[key] || self.result.data[key];
					return (" WHERE " +self.result.name[self.result.info.pkey]+ " = '" + base.escapeRegExp(tmp[self.result.info.pkey]) + "';")
				}
				
				return (function(key, func) {
					var self = this;
					if (!isset(this.result.info) || !isset(this.result.info.pkey)) {
						base.query($http, "SHOW INDEX FROM " + this.tableName + ";", this.databaseName).success(function(res) {
							var obj = self.result.info || (self.result.info = {});
							for (var i in self.result.name) {
								if (res.data[0][4] == self.result.name[i]) {
									obj.pkey = i;
									break;
								}
							}
							func(format(key, self));
						});
					} else {
						func(format(key, self));
					}
				});
			})(),
			updateRow: function(key) {
				var self = this;
				var call = function(where) {
					var a = "UPDATE " + self.tableName + " SET ", b = 0;
					for (var i in self.result.name) {
						if (self.save[key][i] != self.result.data[key][i]) {
							a += ((b != 0) ? ', ' : '' ) + self.result.name[i] + " = '" + base.escapeRegExp((isset(self.result.data[key][i])) ? self.result.data[key][i] : '') + "'";
							b += 1;
						}
					}
					a += where;
					if (b != 0) {
						self.current = base._query.add(a);
						base.query($http, self.current, self.databaseName).success(function(res) {
							self.reloadRow();
						});
					}
				}
				this.BuildWhere(key, call);
			},
			removeRow: function(key) {
				var self = this;
				
				var call = function(where) {
					self.current = base._query.add("DELETE FROM " + self.tableName + where);
					base.query($http, self.current, self.databaseName).success(function(res) {
						self.current = 'SELECT * FROM ' + self.tableName + ';';
						$scope.sql.run();
					});
				}
				this.BuildWhere(key, call);
			},
			reloadRow: function(key) {
				var self = this;
				var call = function(where) {
					self.current = base._query.add("SELECT * FROM " + self.tableName + where);
					base.query($http, self.current, self.databaseName).success(function(res) {
						if (res.data.length != 0) {
							self.result.data[key] = res.data[0];
						} else {
							self.result.data.slice(key, key + 1);
						}
					});
				}
				this.BuildWhere(key, call);
			}
		}
		
		base._connection.Init($cookies, $http);
		$scope.sql.run();
		$timeout(function() {
			$('.jinxloadPage').css('opacity', '1');
		}, 250);
	}]);
	
})(Jinx || (Jinx = {}));