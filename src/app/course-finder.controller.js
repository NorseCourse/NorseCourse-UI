(function() {
    'use strict';

    angular.module('norseCourse').controller('courseFinderController', function($scope, norseCourseService) {
        $scope.courseSearchTerms = [];
        $scope.matchingCourses = [];
        $scope.loading = null;

        $scope.autocompleteQuery = function(queryText) {
            var types = ['gen ed', 'dept', 'course', 'keyword'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };

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
                $scope.courseSearchTerms.pop();
                return text;
            }
        };

	$scope.$watch('courseSearchTerms',function(newValue,oldValue){
	    
	    if (newValue !== undefined && newValue.length != 0) {
		$scope.loading = 'indeterminate';
		//console.log('find',newValue,oldValue);
		norseCourseService.queryApi(newValue,oldValue).then(function(data){
		    
		    $scope.matchingCourses = data;
		    $scope.loading = null;
		});
	    }
	},true);
	


	
        $scope.$watch('courseSearchTermsOFF', function(newValue, oldValue) {
            $scope.loading = 'indeterminate';
	    console.log(newValue);
            norseCourseService.searchCourses(newValue).then(function(data) {
                $scope.matchingCourses = data;
                $scope.loading = null;
            });
        }, true); //object equality 
    });
})();
