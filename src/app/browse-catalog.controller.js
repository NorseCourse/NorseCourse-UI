(function() {
    'use strict';
    angular.module('norseCourse').controller('browseCatalog',function($scope,$q,$timeout){
	
	$scope.res = function(queryText){
	    var deferred = $q.defer();
	    $timeout(function(){
	    deferred.resolve([
		{value:'REL'},
		{value:'SOC'},
		{value:'CHEM'}
	    ]);
	    },1000);
	    //return [{value:'John'}];
	    return deferred.promise;
	};
	$scope.deptNames = [
	    {value:'Computer Science'},
	    {value:'Physics'},
	    {value:'Chemistry'},
	    {value:'Mathematics'},
	    {value:'Nursing'}
	];
	$scope.querySearch = function(queryText){
	    var results = queryText ? $scope.deptNames : $scope.deptNames;
	    return results;
	};

	
    });
})();
/**
//array = search able terms were value is key, json is value. json has dept name and abbrev        
$scope.querySearch = function(queryText){
    var results = query ? call some function : function to list all department names;
};


[
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
  },
  {
    "abbreviation": "CHEM",
    "department_id": 29,
    "division_id": 5,
    "name": "Chemistry"
  },
  {
    "abbreviation": "SCI",
    "department_id": 30,
    "division_id": 5,
    "name": "Science"
  },
  {
    "abbreviation": "PHYS",
    "department_id": 31,
    "division_id": 5,
    "name": "Physics"
  },
  {
    "abbreviation": "ENVS",
    "department_id": 32,
    "division_id": 5,
    "name": "Enviromental Studies"
  },
  {
    "abbreviation": "BIO",
    "department_id": 46,
    "division_id": 5,
    "name": "Biology"
  },
  {
    "abbreviation": "HLTH",
    "department_id": 48,
    "division_id": 5,
    "name": "Health"
  },
  {
    "abbreviation": "ATHTR",
    "department_id": 49,
    "division_id": 5,
    "name": "Atheltic Training"
  },
  {
    "abbreviation": "PE",
    "department_id": 50,
    "division_id": 5,
    "name": "Physical Education"
  }
]
**/
