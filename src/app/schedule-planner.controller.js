(function() {
    'use strict';
    angular.module('norseCourse').controller('schedulePlannerController', function($scope, norseCourseService) {
        $scope.expanded = 'form';
        $scope.requiredCourses = [];
        $scope.preferredCourses = [];
        $scope.requiredGenEds = [];
        $scope.preferredGenEds = [];

        $scope.toggleExpanded = function(section) {
            if ($scope.expanded === section) {
                $scope.expanded = null;
            } else {
                $scope.expanded = section;
            }
        };
        
        $scope.courseQuery = function(queryText) {
            var types = ['course'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };

        $scope.genEdQuery = function(queryText) {
            var types = ['gen ed'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };

        $scope.getSchedules = function() {
            norseCourseService.getSchedules(
                $scope.requiredCourses,
                $scope.preferredCourses,
                $scope.requiredGenEds,
                $scope.preferredGenEds).then(function(data) {
                    $scope.results = data;
                    $scope.loadSchedule(data[0].schedule);
                    if ($scope.expanded !== 'results') {
                        $scope.toggleExpanded('results');
                    }
                    console.log($scope.results);
                });
        };

        $scope.getSchedules = function(sectionIds) {
            $scope.currentSchedule = [];
            angular.forEach(sectionIds, function(sectionId) {
                norseCourseService.getSection(sectionId).then(function(section) {
                    $scope.currentSchedule.push(section);
                });
            });
        };
                                             
    });
})();
