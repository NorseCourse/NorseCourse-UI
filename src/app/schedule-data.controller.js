(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name norseCourse.controller:scheduleDataController
     * @description
     *
     * loads schedule data for the tempalte
     *
     */
    angular.module('norseCourse').controller('scheduleDataController', function($scope, norseCourseService) {
        $scope.scheduleData = [];

        $scope.$watch('$ctrl.schedules', function(newData) {
            if (angular.isArray($scope.$ctrl.schedules)) {
                var scheduleData = [];
                $scope.scheduleData = scheduleData;
                angular.forEach($scope.$ctrl.schedules, function(schedule) {
                    var sectionObjects = [];
                    scheduleData.push(sectionObjects);
                    angular.forEach(schedule, function(sectionId) {
                        norseCourseService.getSection(sectionId).then(function(sectionObject) {
                            sectionObjects.push(sectionObject);
                        });
                    });
                });
            }
        }, true);
        
    });
})();
