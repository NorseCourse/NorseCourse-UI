(function() {
    'use strict';
    angular.module('norseCourse').controller('browseCatalog',function($scope,$q,$timeout,norseCourseService){
	$scope.res = [];
	$scope.deptSearchTerms = [];
	$scope.loading = null;

	
	$scope.autocompleteQuery = function(queryText) {
	    var types = ['dept'];
	    return norseCourseService.autocompleteQuery(queryText,types);//maybe include some keyword to drop down
	};
	/**
	$scope.$watch('selectedItem',function(newValue,oldValue){
	    console.log('browse',newValue, oldValue);
	    norseCourseService.queryApi(newValue,oldValue).then(function(data){
		$scope.matchingCourses = data;
	    });
	},true);
	**/
	$scope.queryFunction = function(newValue){
	    $scope.loading = 'indeterminate';
	    console.log('browse',newValue);
	    norseCourseService.queryApi(newValue).then(function(data){
		$scope.matchingCourses = data;
		$scope.loading = null;
	    });
	    
	};
	   
    });
    
})();

	

