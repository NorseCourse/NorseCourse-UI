/**
 * @ngdoc controller
 * @name norseCourse.controller:courseFinderController
 * @description 
 *
 * Contains methods and models to allow users to find courses
 * 
*/



(function() {
    'use strict';

    angular.module('norseCourse').controller('courseFinderController', function($scope, norseCourseService) {
        $scope.courseSearchTerms = [];
        $scope.matchingCourses = [];
        $scope.loading = null;
	
	/**
	 *@ngdoc method
	 *@name autocompleteQuery
	 *@methodOf norseCourse.controller:courseFinderController
	 *@description
	 *
	 * Methods displays autocomplete options for 
	 * end user. Autocompletes gen eds, departments,
	 * courses, of keywords (if none of the others apply)
	 * 
	 * @param {string} queryText A string that is the text to be autocompleted
	 * @returns {Array} Why doesn't this work? 
	 */
	
        $scope.autocompleteQuery = function(queryText) {
            var types = ['gen ed', 'dept', 'course', 'keyword'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };

	/**
	 *@ngdoc method
	 *@name newKeyword
	 *@methodOf norseCourse.controller:courseFinderController
	 *@description
	 *
	 *We may not actually use this
	 *
	 */
        $scope.newKeyword = function(text) {
            if (angular.isString(text)) {
                return {
                    type: 'keyword',
                    data: {
                        name: text,
                        text: text
                    }
                };
            } else {
                //$scope.courseSearchTerms.pop();
                return text;
            }
        };
	/**
	 *@ngdoc method
	 *@name findCourses
	 *@methodOf norseCourse.controller:courseFinderController
	 *@description
	 *
	 *Finds courses based on the contents of the $scope.courseSearchTerms.
	 *Erases the current display if $scope.courseSearchTerms is empty. 
	 *The side effect of this function is that the model containing
	 *courses to be display is updated.
	 *
	 *@param {Array} newValue This is the array of course search terms you want to search 
	 *@param {Array=} oldValue This is the *old* array of courses. (Is this optional?)
	 *
	 */
	$scope.findCourses = function(newValue,oldValue){
	    
	    if (newValue !== undefined && newValue.length !== 0) {
		$scope.loading = 'indeterminate';
		$scope.matchingCourses = [];
		//console.log('find',newValue,oldValue);
		norseCourseService.queryApi(newValue,oldValue).then(function(data){
		    
		    $scope.matchingCourses = data;
		    $scope.loading = null;
		});
	    }
	    else {
		$scope.matchingCourses = [];
	    }
	};

	
	//Is this an event?
	$scope.$watch('courseSearchTerms',$scope.findCourses,true);
	
    });
})();
