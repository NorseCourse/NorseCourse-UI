(function() {
    'use strict';
    angular.module('norseCourse').controller('browseCatalog',function($scope,$q,$timeout){
	//array = search able terms were value is key, json is value. json has dept name and abbrev
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
	    
	    console.log($scope.names);
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

	
    });
})();
/**
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
	$scope.deptNames =[
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
	$scope.tempNames = [
	    {value:'CS'},
	    {value:'Phys'},
	    {value:'Chem'},
	    {value:'Math'},
	    {value:'Nurs'}
	];
	
	$scope.querySearch = function(queryText){
	    console.log(queryText ? "cat": "dog")
	    var results = queryText ? $scope.deptNames :$scope.tempNames;// $scope.deptNames;
	    return results;
	};

	
    });
})();

//array = search able terms were value is key, json is value. json has dept name and abbrev
$scope.names = loadNames()
$scope.querySearch = function(queryText){
    var results = queryText ? $scope.names.filter($scope.createFilterFor(queryText))  : $scope.names// to list all department names;
};

$scope.createFilterFor(queryText){
    var lowercaseQuery = angular.lowercase(query);
    
    return $scope.filterFn(dept){
	return(angular.lowercase(dept).includes(lowercaseQuery);
    };
    
};

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

/**

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
