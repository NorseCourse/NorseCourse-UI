(function() {
    'use strict';
    angular.module('norseCourse').controller('browseCatalog',function($scope,$q,$timeout,norseCourseService){
	$scope.res = [];
	$scope.deptSearchTerms = [];
	$scope.loading = null;

	
	$scope.autocompleteQuery = function(queryText) {
	    //console.log($scope.selectedItem);
	    var types = ['dept'];
	    return norseCourseService.autocompleteQuery(queryText,types);//maybe include some keyword to drop down
	};

	$scope.$watch('selectedItem', function(newValue,oldValue){
	    //write function in that goes through the courses in catalog to match depart to beginning of courses strings. THIS WON'T BE USED IN THE FUTURE. just for practice.
	    //console.log(newValue);
	    console.log(newValue);
	    norseCourseService.foo(newValue).then(function(data) {
		$scope.matchingCourses = data; //maybe call matchingData
		//console.log(data);
	    });
	},true);
	//write function that watches for change of selected item
	//when changes, query api to get courses with department = selected item.
	//No chips.
	// 
    });
})();

	

