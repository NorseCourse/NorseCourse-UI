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
    });
})();
