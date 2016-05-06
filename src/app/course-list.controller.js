
/**
 *@ngdoc controller
 *@name norseCourse.controller:courseList
 *@description
 *
 *Displays a list of courses in a grid tile formation.
 *
 */


(function() {
    'user strict';
    angular.module('norseCourse').controller('courseListController', function($scope,$mdDialog, $mdMedia, schedulesService,norseCourseService) {

	$scope.icon = 'add_circle_outline';
	$scope.formatBody = null;
        
//**********************************Everything for dialog*******************///
	$scope.courseDialog = function(obj,ev) {
	    $mdDialog.show({
		controller: function($scope, $mdDialog,info) {
	            $scope.info = info;
	            $scope.secIds = info.section.map(function(sectionObj) {
                        return sectionObj.id;
                    });
	            $scope.hide = function() {
		        $mdDialog.hide();
	            };
	        },

		templateUrl: 'views/app/course-dialog.html',
		targetEvent: ev,

		clickOutsideToClose:true,
		locals: {info: obj.info}
	    });
	};	
//********************************************** done with dialog*************///
        

	$scope.searchGenEd = function(data){
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
	};

	$scope.addToSchedule = function(courseSection,required){
	    var course = {
		'type':'course',
		'display':'course',
		'data':courseSection.info.course
	    };
	    console.log('add to Schedule',course);
	    if (required === 1){
		schedulesService.addCourse(course, true);  	
	    }
	    else if (required === 0) {
		schedulesService.addCourse(course, false);  
	    }
	};
    });
})();
