(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name norseCourse.directive:ncScheduleData
     * @description
     *
     * renders schedule data as hidden html for screen scraping
     * The data can be retrieved with by the follow class hierarchy:
     * ```
     * .data
     *   .data__schedule
     *     .data__schedule__section
     *       .data_schedule__section__name (eg 'CS-151-A')
     *       .data_schedule__section__department (eg 'CS')
     *       .data_schedule__section__course-number (eg '151')
     *       .data_schedule__section__section-number (eg 'A')
     * ```
     *
     */
    angular.module('norseCourse').component('ncScheduleData', {
        templateUrl: 'views/app/schedule-data.html',
        controller: 'scheduleDataController',
        bindings: {
            schedules: '='
        }
    });
})();
