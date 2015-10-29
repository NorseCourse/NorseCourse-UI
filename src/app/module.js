(function() {
    'use strict';
    angular.module('norseCourse', ['ngMaterial'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('yellow')
                .warnPalette('orange')
                .backgroundPalette('grey');
        });
})();

