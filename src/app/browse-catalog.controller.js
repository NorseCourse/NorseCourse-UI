(function() {
    'use strict';
    angular.module('norseCourse').controller('browseCatalog',function($scope,$q,$timeout,norseCourseService){
	$scope.res = [];

	$scope.autocompleteQuery = function(queryText) {
	    console.log(queryText);
	    var types = ['dept'];
	    return norseCourseService.autocompleteQuery(queryText,types);
	};
	
    });
})();
	/**
	$scope.loadNames = function(){
	    //Note: This info could be gotten from the service. For now I'll 
	    return [
		{
		    "abbreviation": "CS",
		    "department_id": 21,
		    "division_id": 5,
		    "name": "Computer Science"
		},
		{
		    "abbreviation": "ACCTG",
		    "department_id": 22,
		    "division_id": 5,
		    "name": "Accounting"
		},
		{
		    "abbreviation": "NURS",
		    "department_id": 25,
		    "division_id": 5,
		    "name": "Nursing"
		},
		{
		    "abbreviation": "MATH",
		    "department_id": 26,
		    "division_id": 5,
		    "name": "Mathematics"
		}
	    ];
	};
	$scope.names = $scope.loadNames();

	
	$scope.querySearch = function(queryText){
	    
	    console.log($scope.names)
	    var results = queryText ? $scope.names.filter($scope.createFilterFor(queryText))  : $scope.names;// to list all department names;

	    return results;
	};

	$scope.createFilterFor= function(queryText) {
	    var lowercaseQuery = queryText.toLowerCase();
	    
	     $scope.filterFn = function(dept) {
		 return(dept.name.toLowerCase().includes(lowercaseQuery));	 
	     };
	    return $scope.filterFn; 
	};
**/
	

