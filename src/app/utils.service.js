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
        
        return publicApi;
    });
})();
