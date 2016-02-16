(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name norseCourse.service:schedulesService
     * @description
     *
     * Service for syncing schedule preferrences across the NorseCourse app
     *
     */
    angular.module('norseCourse').service('schedulesService', function() {
        var privateApi = {
            preferredCourses: [],
            requiredCourses: [],
            preferredGenEds: [],
            requiredGenEds: []
        };

        var publicApi = {};

        /**
         * @ngdoc method
         * @name getPreferredCourses
         * @methodOf norseCourse.service:schedulesService
         * @returns {Object[]} array of preferred courses
         */
        publicApi.getPreferredCourses = function() {
            return privateApi.preferredCourses;
        };

        /**
         * @ngdoc method
         * @name getRequiredCourses
         * @methodOf norseCourse.service:schedulesService
         * @returns {Object[]} array of required courses
         */
        publicApi.getRequiredCourses = function() {
            return privateApi.requiredCourses;
        };

        /**
         * @ngdoc method
         * @name getPreferredGenEds
         * @methodOf norseCourse.service:schedulesService
         * @returns {Object[]} array of preferred gen eds
         */
        publicApi.getPreferredGenEds = function() {
            return privateApi.preferredGenEds;
        };

        /**
         * @ngdoc method
         * @name getRequiredGenEds
         * @methodOf norseCourse.service:schedulesService
         * @returns {Object[]} array of required gen eds
         */
        publicApi.getRequiredGenEds = function() {
            return privateApi.requiredGenEds;
        };

        /**
         * @ngdoc method
         * @name addPreferredCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Adds a course to the preferred courses list
         * If the course is already in the preferred or required courses, it does nothing
         *
         * @param {Object} course - the course to add
         * @returns {boolean} true if the course was added
         */
        publicApi.addPreferredCourse = function(course) {
            if (!publicApi.hasCourse(course)) {
                privateApi.preferredCourses.push(course);
                return true;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name addRequiredCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Adds a course to the required courses list
         * If the course is already in the preferred or required courses, it does nothing
         *
         * @param {Object} course - the course to add
         * @returns {boolean} true if the course was added
         */
        publicApi.addRequiredCourse = function(course) {
            if (!publicApi.hasCourse(course)) {
                privateApi.requiredCourses.push(course);
                return true;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name addPreferredGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Adds a gen ed to the preferred gen eds list
         * If the gen ed is already in the preferred or required gen eds, it does nothing
         *
         * @param {Object} genEd - the gen ed to add
         * @returns {boolean} true if the gen ed was added
         */
        publicApi.addPreferredGenEd = function(genEd) {
            if (!publicApi.hasGenEd(genEd)) {
                privateApi.preferredGenEds.push(genEd);
                return true;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name addRequiredGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Adds a gen ed to the required gen eds list
         * If the gen ed is already in the preferred or required gen eds, it does nothing
         *
         * @param {Object} genEd - the gen ed to add
         * @returns {boolean} true if the gen ed was added
         */
        publicApi.addRequiredGenEd = function(genEd) {
            if (!publicApi.hasGenEd(genEd)) {
                privateApi.requiredGenEds.push(genEd);
                return true;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name hasRequiredCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * checks if a course is in the required courses
         *
         * @param {Object} course - the course to check for
         * @returns {boolean} true if the course is in the required courses
         */
        publicApi.hasRequiredCourse = function(course) {
            for (var i = 0; i < privateApi.requiredCourses.length; i++) {
                if (angular.equals(privateApi.requiredCourses[i], course)) {
                    return true;
                }
            }
            return false;
        };

        /**
         * @ngdoc method
         * @name hasPreferredCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * checks if a course is in the preferred courses
         *
         * @param {Object} course - the course to check for
         * @returns {boolean} true if the course is in the preferred courses
         */
        publicApi.hasPreferredCourse = function(course) {
            for (var i = 0; i < privateApi.preferredCourses.length; i++) {
                if (angular.equals(privateApi.preferredCourses[i], course)) {
                    return true;
                }
            }
            return false;
        };

        /**
         * @ngdoc method
         * @name hasCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * checks if a course in the preferred or required courses
         *
         * @param {Object} course - the course to check for
         * @returns {Object} true if the course is in the preferred or required courses
         */
        publicApi.hasCourse = function(course) {
            return (publicApi.hasRequiredCourse(course) ||
                    publicApi.hasPreferredCourse(course));
        };

        /**
         * @ngdoc method
         * @name hasRequiredGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * checks if a gen ed is in the required gen eds
         *
         * @param {Object} genEd - the gen ed to check for
         * @returns {Object} true if the gen ed is in the required gen eds
         */
        publicApi.hasRequiredGenEd = function(genEd) {
            for (var i = 0; i < privateApi.requiredGenEds.length; i++) {
                if (angular.equals(privateApi.requiredGenEds[i], genEd)) {
                    return true;
                }
            }
            return false;
        };


        /**
         * @ngdoc method
         * @name hasPreferredGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * checks if a gen ed is in the preferred gen eds
         *
         * @param {Object} genEd - the gen ed to check for
         * @returns {Object} true if the gen ed is in the preferred gen eds
         */
        publicApi.hasPreferredGenEd = function(genEd) {
            for (var i = 0; i < privateApi.preferredGenEds.length; i++) {
                if (angular.equals(privateApi.preferredGenEds[i], genEd)) {
                    return true;
                }
            }
            return false;
        };

        /**
         * @ngdoc method
         * @name hasGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * checks if a gen ed is in the preferred or required gen eds
         *
         * @param {Object} genEd - the gen ed to check for
         * @returns {Object} true if the gen ed is in the preferred or required gen eds
         */
        publicApi.hasGenEd = function(genEd) {
            return (publicApi.hasRequiredGenEd(genEd) ||
                    publicApi.hasPreferredGenEd(genEd));
        };

        /**
         * @ngdoc method
         * @name removeRequiredCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * removes a required course
         * If the course is not in the required courses, does nothing
         *
         * @param {Object} course - the course to remove
         * @returns {boolean} true if the course was removed
         */
        publicApi.removeRequiredCourse = function(course) {
            if (publicApi.hasRequiredCourse(course)) {
                for (var i = 0; i < privateApi.requiredCourses.length; i++) {
                    if (angular.equals(privateApi.requiredCourses[i], course)) {
                        privateApi.requiredCourses.splice(i, 1);
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name removePreferredCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * removes a preferred course
         * If the course is not in the preferred courses, does nothing
         *
         * @param {Object} course - the course to remove
         * @returns {boolean} true if the course was removed
         */
        publicApi.removePreferredCourse = function(course) {
            if (publicApi.hasPreferredCourse(course)) {
                for (var i = 0; i < privateApi.preferredCourses.length; i++) {
                    if (angular.equals(privateApi.preferredCourses[i], course)) {
                        privateApi.preferredCourses.splice(i, 1);
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name removeCourse
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * removes a course if it is either the required or preferred courses
         *
         * @param {Object} course - the course to remove
         * @returns {boolean} true if the course was removed
         */
        publicApi.removeCourse = function(course) {
            var foo = publicApi.removePreferredCourse(course);
            var bar = publicApi.removeRequiredCourse(course);
            return foo || bar;
        };

        /**
         * @ngdoc method
         * @name removeRequiredGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * removes a required gen ed
         * If the gen ed is not in the required gen eds, does nothing
         *
         * @param {Object} genEd - the gen ed to remove
         * @returns {boolean} true if the gen ed was removed
         */
        publicApi.removeRequiredGenEd = function(genEd) {
            if (publicApi.hasRequiredGenEd(genEd)) {
                for (var i = 0; i < privateApi.requiredGenEds.length; i++) {
                    if (angular.equals(privateApi.requiredGenEds[i], genEd)) {
                        privateApi.requiredGenEds.splice(i, 1);
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name removePreferredGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * removes a preferred gen ed
         * If the gen ed is not in the preferred gen eds, does nothing
         *
         * @param {Object} genEd - the gen ed to remove
         * @returns {boolean} true if the gen ed was removed
         */
        publicApi.removePreferredGenEd = function(genEd) {
            if (publicApi.hasPreferredGenEd(genEd)) {
                for (var i = 0; i < privateApi.preferredGenEds.length; i++) {
                    if (angular.equals(privateApi.preferredGenEds[i], genEd)) {
                        privateApi.preferredGenEds.splice(i, 1);
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name removeGenEd
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * removes a gen ed from either the required or preferred gen eds
         *
         * @param {Object} genEd - the gen ed to remove
         * @returns {boolean} true if the gen ed was removed
         */
        publicApi.removeGenEd = function(genEd) {
            var foo = publicApi.removePreferredGenEd(genEd);
            var bar = publicApi.removeRequiredGenEd(genEd);
            return foo || bar;
        };

        return publicApi;
    });
})();
