(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name norseCourse.directive:ncHelp
     */
    angular.module('norseCourse').component('ncHelp', {
        controller: function($scope) {
            $scope.getWidth = function(selector) {
                return $(selector).width();
            };
        },
        templateUrl: 'views/app/help.html'
    });
})();
