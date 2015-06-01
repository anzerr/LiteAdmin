var Jinx;
(function(base) {
	"use strict";

	var collaps = {
		status: true,
		init: function() {
			var self = this;
			this.menu = $('.jinxMenu');
			this.view = $('.jinxView');
			this.button = $('.jinxCollaps').on('click', function() {
				self.menu.css('left', (self.status) ? '-200px' : '0px');
				self.view.css('margin-left', (self.status) ? '0px' : '200px');
				self.status = !self.status;
			});
		},
		hook: function() {
			
		}
	};
	
	var _cache = [];
	
	base.controller.directive('jinxMenu', ['$timeout', '$http', function($timeout, $http) {
		var link = function(scope, element, attrs) {
			scope.db = {
				database: _cache,
				Reload:function() {
					var self = this;
					base.query($http, 'SHOW DATABASES;').success(function(res) {
						if (res !== 'null') {
							var tmp = [];
							for (var i in res.data) {
								tmp.push({name:res.data[i][0], display:false, loaded:false, table:[]});
							}
							self.database = (_cache = tmp);
						}
					});
				},
				loadTables: function(k) {
					var row = scope.db.database[k];
					
					if (!row.loaded) {
						base.query($http, 'SHOW TABLES from ' + row.name + ';').success(function(res) {
							if (res !== 'null') {
								var tmp = [];
								for (var i in res.data) {
									tmp.push(res.data[i][0]);
								}
								row.table = tmp;
								row.loaded = true;
							}
						});
					}
					
					scope.db.database[k].display = !scope.db.database[k].display;
				}
			}
			
			$timeout(function() {
				collaps.init();
				base._reload = function() {
					scope.db.Reload();
				};
				base._reload();
			});
		}
		
		return {
			restrict: 'E',
			templateUrl: '/public/app/partials/menu.html',
			link: link,
		};
	}]);
	
})(Jinx || (Jinx = {}));