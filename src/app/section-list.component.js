(function() {
    'use strict';
    angular.module('norseCourse').component('ncSectionList', {
        templateUrl: 'views/app/section-list.html',
        controller: 'sectionListController',
        bindings: {
            sections: '='
        }
    });
})();
