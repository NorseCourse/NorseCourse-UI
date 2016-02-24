(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name norseCourse.directive:ncSectionList
     * @description
     *
     * Displays a list of sections, from section ids
     *
     */
    angular.module('norseCourse').component('ncSectionList', {
        templateUrl: 'views/app/section-list.html',
        controller: 'sectionListController',
        bindings: {
            sections: '='
        }
    });
})();
