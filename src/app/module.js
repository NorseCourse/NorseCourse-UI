(function() {
    'use strict';
    angular.module('norseCourse', ['ngRoute', 'ngMaterial', 'ngMdIcons', 'ngCookies'])
        .config(function($mdThemingProvider, $routeProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');

            // $mdThemingProvider.theme("darkTheme")
            //     .primaryPalette('deep-purple')
            //     .accentPalette('teal')
            //     .warnPalette('red')
            //     .backgroundPalette('grey')
            //     .dark();

            $routeProvider.when('/find', {
                resolve: {
                    index: function() { return 0; }
                }
            }).when('/plan', {
                resolve: {
                    index: function() { return 1; }
                }
            }).when('/help', {
                resolve: {
                    index: function() { return 2; }
                }
            }).otherwise('/find');
        });
})();

//  red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
//  light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
