(function() {
    'user strict';
    angular.module('norseCourse').controller('courseListController', function($scope,$mdDialog) {
	$scope.isOpen = false;
	$scope.courses2 = [{'name':'this','gen_ed':'Gen'},{'name':'th34','gen_ed':'Eds'},{'name':'tasdfis','gen_ed':'Here'}];
	$scope.clickAlert = function(){
	    console.log('in clickedAlert()');
	    $mdDialog.show(
		$mdDialog.alert()
		    .title('Wow!')
		    .content('You selected a course. Don\'t worry, selecting doesn\'t actually do anything')
		    .ok('Cool'));
	
	};


    });
})();
