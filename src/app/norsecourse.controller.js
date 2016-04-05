(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name norseCourse.controller:main
     * @description
     *
     * Main controller for NorseCourse app, which doesn't actually do anything
     *
     */
    angular.module('norseCourse').controller('main',function($location, $scope) {
        $scope.tabIndex = 0;
        $scope.$on('$routeChangeSuccess', function(event, current) {
            $scope.tabIndex = current.locals.index;
        });
        $scope.onTabSelect = function(tab) {
            $location.path(tab);
        };
    });
})();

