var Jinx;
(function(base) {
	"use strict";

	var cancal = function(e) {
		if (e.preventDefault) { e.preventDefault(); }
		return false;	
	}
	
	base.controller.directive("jinxDropzone", function() {
		var link = function (scope, elem) {
			elem.bind('dragover', cancal);
			elem.bind('dragenter', cancal);
			elem.bind('drop', function(evt) {
				evt.stopPropagation();
				evt.preventDefault();

				var files = evt.dataTransfer.files;
				for (var i = 0, f; f = files[i]; i++) {
					var reader = new FileReader();
					reader.readAsText(f);
					
					reader.onload = (function(theFile) {
						return function(e) {
							scope.import.add({
								name: ['name'],
								data: {	
									name: theFile.name,
									content: reader.result,
								}
							});
						};
					})(f);
				}
			});
		}
		
		return {
			restrict: "A",
			link: link,
		}
	});
		
})(Jinx || (Jinx = {}));