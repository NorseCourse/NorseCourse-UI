(function() {
    'use strict';

    angular.module('norseCourse').controller('courseFinderController', function($scope, norseCourseService) {
        $scope.courseSearchTerms = [];

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
                }
            } else {
                // a keyword was always created when enter hit
                // not sure what's goign on here
                $scope.courseSearchTerms.pop();
                return text;
            }
        };
    });
})();
