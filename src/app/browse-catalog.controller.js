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
	    console.log('browse',newValue);
	    norseCourseService.queryApi(newValue).then(function(data){
		$scope.matchingCourses = data;
	    });
	};
	/**
	$scope.$watch('seledctedItem',function(newValue,oldValue){
	     //write function in that goes through the courses in catalog to match depart to beginning of courses strings. THIS WON'T BE USED IN THE FUTURE. just for practice.
	    //console.log(newValue);
	    console.log(newValue);
	    
	    var temp_array = [newValue];
	    var parameters = {};
	    console.log(newValue);
	    angular.forEach(temp_array,function(chip){
		var type = chip.type + 's';//temporary fix for department. 
		var id = '';
		if (type !== 'keywork'){
		
		    id = eval('chip.data.'+ chip.type+'Id');
		    console.log(id);
		}else{
		    id = chip.text;
		};
		console.log(typeof parameters);
		var keys = [];                      //Note:
		for(var k in parameters) keys.push(k);     // object.keys() isn't working

		
		if (keys.indexOf(id) === -1){
		    parameters[type] = [id];
		}else{
		    console.log('in else');
		    parameters[type].push(id);
		};
		console.log(parameters);
		
	    });
	    norseCourseService.getCourseAndSectionData(parameters).then(function(data){
		console.log(data);
		$scope.matchingCourses = data; //This data will have both courses and sections
		//$scope.courseSectionArray=data;
	    });
	    
	},true);
	**/
	$scope.printPlease = function(newValue,oldValue){
	    console.log('please!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11');
	};
	
	/**	
	$scope.func = function(newValue,oldValue){
	    //write function in that goes through the courses in catalog to match depart to beginning of courses strings. THIS WON'T BE USED IN THE FUTURE. just for practice.
	    //console.log(newValue);
	    console.log(newValue);
	   
	    var temp_array = [newValue];
	    var parameters = {};
	    console.log(newValue);
	    angular.forEach(temp_array,function(chip){
		var type = chip.type + 's';//temporary fix for department. 
		var id = '';
		if (type !== 'keywork'){
		
		    id = eval('chip.data.'+ chip.type+'Id');
		    console.log(id);
		}else{
		    id = chip.text;
		};
		console.log(typeof parameters);
		var keys = [];                      //Note:
		for(var k in parameters) keys.push(k);     // object.keys() isn't working

		
		if (keys.indexOf(id) === -1){
		    parameters[type] = [id];
		}else{
		    console.log('in else');
		    parameters[type].push(id);
		};
		console.log(parameters);
		
	    });
	    norseCourseService.getCourseAndSectionData(parameters).then(function(data){
		console.log(data);
		$scope.matchingCourses = data; //This data will have both courses and sections
		//$scope.courseSectionArray=data;
	    });
	};
	**/
	

	   
	//write function that watches for change of selected item
	//when changes, query api to get courses with department = selected item.
	//No chips.
	
    });
    
})();

	

