var Jinx;
(function(base) {
	"use strict";

	base.controller.directive('jinxMenu', function() {
		var link = function(scope, element, attrs) {
			console.log("cat");
			
			scope.database = [
				{ name: 'cat', table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'dog', table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'fine', table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'jake', table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
				{ name: 'deus', table: ['table1', 'table2', 'table3', 'table4', 'table5'] },
			]
			
			scope.name = "jake the dog";
		}
		
		return {
			restrict: 'E',
			templateUrl: '/public/app/partials/menu.html',
			link: link,
		};
	});
	
})(Jinx || (Jinx = {}));