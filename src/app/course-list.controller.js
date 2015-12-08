(function() {
    'user strict';
    angular.module('norseCourse').controller('courseListController', function($scope,$mdDialog,schedulesService,norseCourseService) {
	$scope.isOpen = false;
	$scope.clickAlert = function(){
	    $mdDialog.show(
		$mdDialog.alert()
		    .title('Wow!')
		    .content('You selected a course. Don\'t worry, selecting doesn\'t actually do anything')
		    .ok('Cool'));
	};
	$scope.formatBody = null;
	$scope.printPlease = function(data){
	    console.log(data);
	    var genEd = {
		'type':'genEd',
		'display':'gen ed',
		'data':data
	    };
	    $scope.$parent.loading = 'indeterminate';
	    $scope.$parent.matchingCourses = [];
	    //console.log('find',newValue,oldValue);
	    norseCourseService.queryApi(genEd).then(function(data){
		
		$scope.$parent.matchingCourses = data;
		$scope.$parent.loading = null;
	    });
	    //$scope.$parent.matchingCourses= ;
	    //console.log($scope.$parent.matchingCourses);
	}

	$scope.addToSchedule = function(courseSection,required){
	    console.log('add to Schedule',courseSection)
	    var course = {
		'type':'course',
		'display':'course',
		'data':courseSection.info.course,
	    };
	    console.log('add to Schedule',course);
	    if (required === 1){
		schedulesService.addRequiredCourse(course);  	
	    }
	    else if (required === 0) {
		schedulesService.addPreferredCourse(course);  
	    }
	};
    });
})();
