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
			$timeout(function() {
				collaps.init();
			
				base.query($http, 'SHOW DATABASES;').success(function(res) {
					try {
						var tmp = [];
						
						for (var i in res){
							tmp.push({name:res[i].Database, display:false, loaded:false, table:[]});
						}
						scope.db.database = (_cache = tmp);
					} catch (e) {
						console.log('not json');
					}
				});
			});
			scope.db = {}
			
			scope.db.database = _cache;

			scope.db.loadTables = function(k) {
				var row = scope.db.database[k];
				
				if (!row.loaded) {
					base.query($http, 'SHOW TABLES from ' + row.name + ';').success(function(res) {
						var tmp = [];
						
						for (var i in res){
							tmp.push(res[i][Object.keys(res[i])[0]]);
						}
						row.table = tmp;
						row.loaded = true;
					});
				}
				
				scope.db.database[k].display = !scope.db.database[k].display;
			}
		}
		
		return {
			restrict: 'E',
			templateUrl: '/public/app/partials/menu.html',
			link: link,
		};
	}]);
	
})(Jinx || (Jinx = {}));