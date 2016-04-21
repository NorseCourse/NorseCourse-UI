(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name norseCourse.service:utils
     * @description
     *
     * Miscellaneous utility and helper functions
     *
     */
    angular.module('norseCourse').service('utils', function() {
        var publicApi = {};
        var privateApi = {};
        
        /**
         * @ngdoc method
         * @name includesObject
         * @methodOf norseCourse.service:utils
         * @description
         *
         * The same as Array.prototype.includes, except uses Angular object equality
         *
         * @param {Object[]} array - the array to search in
         * @param {Object} searchElement - the object to search for
         * @param {number} fromIndex - optional, defaults to 0
         * @returns {boolean} true if the searchElement was found
         */
        publicApi.includesObject = function(array, searchElement, fromIndex) {
            return publicApi.indexOfObject(array, searchElement, fromIndex) !== -1;
        };

        /**
         * @ngdoc method
         * @name indexOfObject
         * @methodOf norseCourse.service:utils
         * @description
         *
         * like Array.prototype.indexOf, except uses Angular object equality
         *
         * @param {Object[]} array - the array to search in
         * @param {Object} searchElement - the object to search for
         * @param {number} fromIndex - optional, defaults to 0
         * @returns {number} the index of the element, -1 if it was not found
         */
        publicApi.indexOfObject = function(array, searchElement, fromIndex) {
            if (fromIndex === undefined) {
                fromIndex = 0;
            } else if (fromIndex < 0) {
                fromIndex = array.length + fromIndex;
            }

            for (var i = fromIndex; i < array.length; i++) {
                if (angular.equals(array[i], searchElement)) {
                    return i;
                }
            }

            return -1;
        };

        privateApi.formatTime = function(s) {
            var hours = Number(s.substr(0, 2));
            var minutes = Number(s.substr(3, 2));
            var am = true;
            if (hours > 11) {
                am = false;
            }
            if (hours > 12) {
                hours -= 12;
            }
            minutes = '0' + minutes.toString();
            minutes = minutes.substr(minutes.length - 2, 2);
            return '' + hours + ':' + minutes + ' ' + (am ? 'am' : 'pm');
        };            

        /**
         * @ngdoc method
         * @name sectionMeetingSummary
         * @methodOf norseCourse.service:utils
         * @param {Object} meeting - section meeting object to summarize
         * @returns {string} - summary
         */
        publicApi.sectionMeetingSummary = function(meeting) {
            var summary = '';
            if (meeting.days !== "nan") {
                summary =  'Meets ' + meeting.days + ' ' + privateApi.formatTime(meeting.startTime) + ' - ' + privateApi.formatTime(meeting.endTime);
            } else {
                summary = 'Time arranged';
            }
            if (meeting.room[0].number !== 'ARR') {
                summary = summary + (summary === '' ? 'In ' : ' in ') + meeting.room[0].buildingAbbreviation + ' ' + meeting.room[0].number;
            } else {
                summary = summary + (summary === '' ? 'Room arranged' : ', room arranged');
            }
            return summary;
        };
        
        return publicApi;
    });
})();
