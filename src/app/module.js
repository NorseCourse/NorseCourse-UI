(function() {
    'use strict';
    angular.module('norseCourse', ['ngMaterial','ngMdIcons'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');
        });
})();

