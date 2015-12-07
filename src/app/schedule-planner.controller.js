(function() {
    'use strict';
    angular.module('norseCourse').controller('schedulePlannerController', function($scope, norseCourseService) {
        $scope.expanded = 'form';
        $scope.requiredCourses = [];
        $scope.preferredCourses = [];
        $scope.requiredGenEds = [];
        $scope.preferredGenEds = [];
        $scope.results = [];
        $scope.currentSchedule = [];
        $scope.currentScheduleIndex = -1;

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
                    $scope.currentScheduleIndex = 0;
                    $scope.loadSchedule(data[0].schedule);
                    if ($scope.expanded !== 'results') {
                        $scope.toggleExpanded('results');
                    }
                });
        };

        $scope.loadSchedule = function(sectionIds) {
            var schedule = [];
            $scope.currentSchedule = schedule;
            angular.forEach(sectionIds, function(sectionId) {
                norseCourseService.getSection(sectionId).then(function(section) {
                    schedule.push(section);
                }, function() {
                    console.log('Failed to load section', sectionId);
                });
            });
        };

        $scope.loadNextSchedule = function() {
            if ($scope.currentScheduleIndex < $scope.results.length - 1) {
                $scope.currentScheduleIndex++;
                var schedule = $scope.results[$scope.currentScheduleIndex];
                console.log(schedule);
                $scope.loadSchedule(schedule.schedule);
            }
        };

        $scope.loadPreviousSchedule = function() {
            if ($scope.currentScheduleIndex > 0) {
                $scope.currentSceduleIndex--;
                var schedule = $scope.results[$scope.currentScheduleIndex];
                console.log(schedule);
                $scope.loadSchedule(schedule.schedule);
            }
        };
    });
})();
