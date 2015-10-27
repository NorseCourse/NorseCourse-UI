(function() {
    'use strict';

    angular.module('norseCourse').controller('courseFinderController', function($scope, norseCourseService) {
        $scope.courseSearchTerms = [];

        $scope.autocompleteQuery = function(queryText) {
            var types = ['gen ed', 'dept', 'course'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };
    });
})();
