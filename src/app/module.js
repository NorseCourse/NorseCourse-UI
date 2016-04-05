(function() {
    'use strict';
    angular.module('norseCourse', ['ngRoute', 'ngMaterial','ngMdIcons'])
        .config(function($mdThemingProvider, $routeProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');

            $routeProvider.when('/find', {
                resolve: {
                    index: function() { return 0; }
                }
            }).when('/plan', {
                resolve: {
                    index: function() { return 1; }
                }
            }).otherwise('/find');
        });
})();

