(function() {
    'use strict';
    angular.module('norseCourse').controller('schedulePlannerController', function($scope, norseCourseService, schedulesService) {
        $scope.expanded = 'form';
        $scope.requiredCourses = [];
        $scope.preferredCourses = [];
        $scope.requiredGenEds = [];
        $scope.preferredGenEds = [];
        $scope.results = [];
        $scope.currentSchedule = [];
        $scope.currentScheduleIndex = -1;

        // watches 'tab', which is inhereted from main scope
        // refreshes the required/preferred courses/gen eds
        // in case they were changed in other tabs
        $scope.watch('tab', function() {
            $scope.preferredCourses = schedulesService.getPreferredCourses();
            $scope.requiredCourses = schedulesService.getRequriedCourses();
            $scope.preferredGenEds = schedulesService.getPreferredGenEds();
            $scope.requiredGenEds = schedulesService.getRequiredGenEds();
        });

        $scope.watch('preferredCourses', function() {
            angular.forEach(schedulesService.getPreferredCourses(), function(course) {
                schedulesService.removePreferredCourse(course);
            });
            angular.forEach($scope.preferredCourses, function(course) {
                schedulesService.addPreferredCourse(course);
            });
        });
        $scope.watch('requriedCourses', function() {
            angular.forEach(schedulesService.getRequiredCourses(), function(course) {
                schedulesService.removeRequiredCourse(course);
            });
            angular.forEach($scope.requiredCourses, function(course) {
                schedulesService.addRequiredCourse(course);
            });
        });
        $scope.watch('preferredGenEds', function() {
            angular.forEach(schedulesService.getPreferredGenEds(), function(genEd) {
                schedulesService.removePreferredGenEd(genEd);
            });
            angular.forEach($scope.preferredGenEds, function(genEd) {
                schedulesService.addPreferredGenEd(genEd);
            });
        });
        $scope.watch('requiredGenEds', function() {
            angular.forEach(schedulesService.getRequiredGenEds(), function(genEd) {
                schedulesService.removeRequiredGenEd(genEd);
            });
            angular.forEach($scope.requiredGenEds, function(genEd) {
                schedulesService.addRequiredGenEd(genEd);
            });
        });

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
                schedulesService.getRequiredCourses(),
                schedulesService.getPreferredCourses(),
                schedulesService.getRequiredGenEds(),
                schedulesService.getPreferredGenEds()).then(function(data) {
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
