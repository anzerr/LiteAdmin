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
	
	base.controller.directive('jinxMenu', ['$timeout', function($timeout) {
		var link = function(scope, element, attrs) {
			$timeout(function() {
				collaps.init();
			});
			console.log("cat");
			
			scope.database = [
				{ name: 'cat', display:false, table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'dog', display:false, table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'fine', display:false, table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'jake', display:false, table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'deus', display:false, table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
			]
			
			scope.name = "jake the dog";
		}
		
		return {
			restrict: 'E',
			templateUrl: '/public/app/partials/menu.html',
			link: link,
		};
	}]);
	
})(Jinx || (Jinx = {}));