(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name norseCourse.controller:schedulePlannerController
     * @description
     *
     * Controller for the schedule planner tab of the NorseCourse app
     *
     */
    angular.module('norseCourse').controller('schedulePlannerController', function($scope, norseCourseService, schedulesService) {
        $scope.expanded = 'form';
        $scope.requiredCourses = angular.copy(schedulesService.getRequiredCourses());
        $scope.requiredGenEds = angular.copy(schedulesService.getRequiredGenEds());
        $scope.results = [];
        $scope.currentSchedule = [];
        $scope.currentScheduleIndex = -1;
        $scope.savedSchedules = schedulesService.getSavedSchedules();
        $scope.currentSavedSchedule = [];
        $scope.currentSavedScheduleIndex = -1;

        $scope.courseSections = {}; // map of courseIds to array of sections for each course
        $scope.selectedCourseSections = {}; // map of courseIds to selected section
        
        $scope.$watch('requiredCourses', function(newRequiredCourses, oldRequiredCourses) {
            angular.forEach(newRequiredCourses, function(requiredCourse) {
                if (!$scope.courseSections.hasOwnProperty(requiredCourse.data.courseId)) {
                    var sections = [];
                    $scope.courseSections[requiredCourse.data.courseId] = sections;
                    $scope.selectedCourseSections[requiredCourse.data.courseId] = null;
                    norseCourseService.fetchSectionsByCourse(requiredCourse.data).then(function(data) {
                        angular.forEach(data, function(section) {
                            sections.push(section);
                        });
                    });
                }
            });
        }, true);
        
        /**
         * @ngdoc method
         * @name toggleExpanded
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Expands of collapses a section, collapsing the previously expanded section
         *
         * @param {string} section - name of the section expand/collapse
         */
        $scope.toggleExpanded = function(section) {
            if ($scope.expanded === section) {
                $scope.expanded = null;
            } else {
                $scope.expanded = section;
            }
        };

        /**
         * @ngdoc method
         * @name courseQuery
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Queries for courses, to be used by an autocomplete
         *
         * @param {string} queryText - the text to query for
         * @returns {Promise} a promise which is resolved by the query results
         */
        $scope.courseQuery = function(queryText) {
            var types = ['course'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };

        /**
         * @ngdoc method
         * @name genEdQuery
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Queries for gen eds, to be used by an autocomplete
         *
         * @param {string} queryText - the text to query for
         * @returns {Promise} a promise which is resolved by the query results
         */
        $scope.genEdQuery = function(queryText) {
            var types = ['gen ed'];
            return norseCourseService.autocompleteQuery(queryText, types);
        };

        /**
         * @ngdoc method
         * @name getSchedules
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Requests schedules for the current schedule preferences, storing the results in $scope.results
         *
         */
        $scope.getSchedules = function() {
            norseCourseService.getSchedules(
                schedulesService.getRequiredCourses(),
                schedulesService.getPreferredCourses(),
                schedulesService.getRequiredGenEds(),
                schedulesService.getPreferredGenEds()).then(function(data) {
                    $scope.results = data;
                    $scope.currentScheduleIndex = 0;
                    $scope.currentSchedule = data[0].schedule;
                    if ($scope.expanded !== 'results') {
                        $scope.toggleExpanded('results');
                    }
                });
        };

        /**
         * @ngdoc method
         * @name nextSchedule
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Sets the current schedule the next schedule from $scope.results
         *
         */
        $scope.nextSchedule = function() {
            if ($scope.currentScheduleIndex < $scope.results.length - 1) {
                $scope.currentScheduleIndex++;
                $scope.currentSchedule = $scope.results[$scope.currentScheduleIndex].schedule;
            }
        };

        /**
         * @ngdoc method
         * @name previousSchedule
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Sets the current schedule the previous schedule from $scope.results
         *
         */
        $scope.previousSchedule = function() {
            if ($scope.currentScheduleIndex > 0) {
                $scope.currentScheduleIndex--;
                $scope.currentSchedule = $scope.results[$scope.currentScheduleIndex].schedule;
            }
        };

        /**
         * @ngdoc method
         * @name nextSavedSchedule
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Sets the current saved schedule the next schedule from $scope.savedSchedules
         *
         */
        $scope.loadNextSavedSchedule = function() {
            if ($scope.currentSavedScheduleIndex < $scope.savedSchedules.length - 1) {
                $scope.currentSavedScheduleIndex++;
                $scope.currentSavedSchedule = $scope.savedSchedules[$scope.currentSavedScheduleIndex];
            }
        };

        /**
         * @ngdoc method
         * @name previousSavedSchedule
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Sets the current saved schedule to the previous schedule from $scope.savedSchedules
         *
         */
        $scope.previousSavedSchedule = function() {
            if ($scope.currentSavedScheduleIndex > 0) {
                $scope.currentSavedScheduleIndex--;
                $scope.currentSavedSchedule = $scope.savedSchedules[$scope.currentSavedScheduleIndex];
            }
        };
        
        /**
         * @ngdoc method
         * @name saveSchedule
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Saves the current schedule
         *
         */
        $scope.saveSchedule = function() {
            var schedule = $scope.results[$scope.currentScheduleIndex].schedule;
            console.log('Saving schedule:', schedule.join(', '));
            schedulesService.saveSchedule(schedule);
            if ($scope.savedSchedules.length === 1) {
                $scope.currentSavedScheduleIndex = 0;
                $scope.currentSavedSchedule = $scope.savedSchedules[0];
            }
        };

        /**
         * @ngdoc method
         * @name removeSavedSchedule
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * Removes the current saved schedule from the saved schedules
         *
         */
        $scope.removeSavedSchedule = function() {
            var schedule = $scope.savedSchedules[$scope.currentSavedScheduleIndex];
            schedulesService.removeSavedSchedule(schedule);
            if ($scope.savedSchedules.length === 0) {
                $scope.currentSavedSchedule = [];
                $scope.currentSavedScheduleIndex = -1;
            } else if ($scope.currentSavedScheduleIndex === 0) {
                $scope.loadSavedSchedule($scope.savedSchedules[0]);
            } else {
                $scope.loadPreviousSavedSchedule();
            }
        };

        /**
         * @ngdoc
         * @name scheduleSaved
         * @methodOf norseCourse.controller:schedulePlannerController
         * @description
         *
         * checks if the current schedule is saved
         *
         * @returns {boolean} true if the schedule is saved
         */
        $scope.scheduleSaved = function() {
            var schedule = $scope.results[$scope.currentScheduleIndex].schedule;
            return schedulesService.hasSavedSchedule(schedule);
        };

    });
})();
