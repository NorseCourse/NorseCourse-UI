(function() {
    'use strict';
    angular.module('norseCourse').directive('ncCourseList', function() {
        return {
            restrict: 'E',
            scope: {
                courses: '='
            },
            templateUrl: 'views/app/course-list.html',
            controller: 'courseListController'
        };
    });
})();
