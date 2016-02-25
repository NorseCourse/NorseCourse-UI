(function() {
    'use strict';
    /**
     * @ngdoc controller
     * @name norseCourse.controller:sectionListController
     * @description
     *
     * Controller for the sections list. In charge of loading the section objects when the list of section ids changes
     *
     */
    angular.module('norseCourse').controller('sectionListController', function($scope, norseCourseService) {
        $scope.sectionObjects = [];
        
        $scope.$watch('$ctrl.sections', function() {
            if (angular.isArray($scope.$ctrl.sections)) {
                console.log('Loading sections:', $scope.$ctrl.sections.join(', '));
                var sectionObjects = [];
                $scope.sectionObjects = sectionObjects;
                angular.forEach($scope.$ctrl.sections, function(sectionId) {
                    norseCourseService.getSection(sectionId).then(function(sectionObject) {
                        sectionObjects.push(sectionObject);
                    }, function() {
                        console.log('Failed to load section', sectionId);
                    });
                });
            }
        }, true);

        /**
         * @ngdoc formatTime
         * @name formatTime
         * @methodOf norseCourse.controller:sectionListController
         * @description
         *
         * Converts a string from 24-hour format to am/pm format
         *
         * @param {string} s - 24-hour formatted time string
         * @return {string} am/pm formatted time string
         */
        $scope.formatTime = function(s) {
            var hours = Number(s.substr(0, 2));
            var minutes = Number(s.substr(3, 2));
            var am = true;
            if (hours > 11) {
                am = false;
            }
            if (hours > 12) {
                hours -= 12;
            }
            minutes = '0' + minutes.toString();
            minutes = minutes.substr(minutes.length - 2, 2);
            return '' + hours + ':' + minutes + ' ' + (am ? 'am' : 'pm');
        };
        
    });
})();
