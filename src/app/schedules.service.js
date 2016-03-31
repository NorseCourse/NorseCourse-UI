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
    angular.module('norseCourse').service('schedulesService', function($http, $q, apiUrl, utils) {
        var privateApi = {
            savedSchedules: [],
            preferences: {
                genEds: [],
                courses: [],
                credits: {
                    min: 12,
                    max: 16
                }
            }
        };

        var publicApi = {};

        /**
         * @ngdoc method
         * @name getSchedulePreferences
         * @methodOf norseCourse.service:schedulesService
         * @returns {Object} schedules preferences
         */
        publicApi.getSchedulePreferences = function() {
            return privateApi.preferences;
        };

        /**
         * @ngdoc method
         * @name hasCourse
         * @methodOf norseCourse.service:schedulesService
         * @param {object} course - the course to check for
         * @returns {boolean} true if preferences has course, either required or preferred
         */
        publicApi.hasCourse = function(course) {
            var foo = privateApi.preferences.courses.map(function(course) {
                return course.data.courseId;
            });
            return foo.indexOf(course.data.courseId) !== -1;
        };

        /**
         * @ngdoc method
         * @name hasGenEd
         * @methodOf norseCourse.service:schedulesService
         * @param {object} genEd - the gen ed to check for
         * @returns {boolean} true if preferences has gen ed, either required or preferred
         */
        publicApi.hasGenEd = function(genEd) {
            return privateApi.preferences.genEds.map(function(genEd) {
                return genEd.data.genEdId;
            }).indexOf(genEd.data.genEdId) !== -1;
        };

        /**
         * @ngdoc method
         * @name isCourseRequired
         * @methodOf norseCourse.service:schedulesService
         * @param {object} course - the course to check for
         * @returns {boolean} true if the course is marked required
         */
        publicApi.isCourseRequired = function(course) {
            return publicApi.hasCourse(course) && privateApi.preferences.courses[privateApi.preferences.courses.map(function(course) {
                return course.data.courseId;
            }).indexOf(course.data.courseId)].required;
        };

        /**
         * @ngdoc method
         * @name isGenEdRequired
         * @methodOf norseCourse.service:schedulesService
         * @param {object} genEd - the gen ed to check for
         * @returns {boolean} true if the gen ed is marked required
         */
        publicApi.isGenEdRequired = function(genEd) {
            return publicApi.hasGenEd(genEd) && privateApi.preferences.genEds[privateApi.preferences.genEds.map(function(genEd) {
                return genEd.data.genEdId;
            }).indexOf(genEd.data.genEdId)].required;
        };

        /**
         * @ngdoc method
         * @name addCourse
         * @methodOf norseCourse.service:schedulesService
         * @param {object} course - the course to add
         * @param {boolean} required - if the course should be marked required
         */
        publicApi.addCourse = function(course, required) {
            if (!publicApi.hasCourse(course)) {
                course = angular.copy(course);
                course.section = null;
                course.required = Boolean(required);
                privateApi.preferences.courses.push(course);
            }
        };

        /**
         * @ngdoc method
         * @name addGenEd
         * @methodOf norseCourse.service:schedulesService
         * @param {object} genEd - the gen ed to add
         * @param {boolean} required - if the gen ed should be marked required
         */
        publicApi.addGenEd = function(genEd, required) {
            if (!publicApi.hasGenEd(genEd)) {
                genEd = angular.copy(genEd);
                genEd.required = Boolean(required);
                privateApi.preferences.genEds.push(genEd);
            }
        };

        /**
         * @ngdoc method
         * @name removeCourse
         * @methodOf norseCourse.service:schedulesService
         * @param {object} course - the course to remove
         */
        publicApi.removeCourse = function(course) {
            if (publicApi.hasCourse(course)) {
                privateApi.preferences.courses.splice(privateApi.preferences.courses.map(function(course) {
                    return course.data.courseId;
                }).indexOf(course.data.courseId), 1);
            }
        };

        /**
         * @ngdoc method
         * @name removeGenEd
         * @methodOf norseCourse.service:schedulesService
         * @param {object} genEd - the gen ed to remove
         */
        publicApi.removeGenEd = function(genEd) {
            if (publicApi.hasGenEd(genEd)) {
                privateApi.preferences.genEds.splice(privateApi.preferences.genEds.map(function(genEd) {
                    return genEd.data.genEdId;
                }).indexOf(genEd.data.genEdId), 1);
            }
        };

        /**
         * @ngdoc method
         * @name saveSchedule
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Adds a schedule to the saved schedules list.
         * Does nothing if the schedule is already saved
         *
         * @param {number[]} schedule - the schedule to save, as a list of sections IDs
         * @returns {boolean} true if the schedule is saved
         */
        publicApi.saveSchedule = function(schedule) {
            schedule = angular.copy(schedule).sort();
            if (!publicApi.hasSavedSchedule(schedule)) {
                privateApi.savedSchedules.push(schedule);
                return true;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name removeSavedSchedule
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Removes a schedule from the saved schedules list.
         * Does nothing if the schedule is not already saved
         *
         * @param {number[]} schedule - the schedule to remove, as a list of sections IDs
         * @returns {boolean} true if the schedule was removed from the save schedules
         */
        publicApi.removeSavedSchedule = function(schedule) {
            schedule = angular.copy(schedule).sort();
            if (publicApi.hasSavedSchedule(schedule)) {
                privateApi.savedSchedules.splice(
                    utils.indexOfObject(privateApi.savedSchedules, schedule),
                    1);
                return true;
            } else {
                return false;
            }
        };

        /**
         * @ngdoc method
         * @name hasSavedSchedule
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Checks if a schedule is saved
         *
         * @param {number[]} schedule - the schedule to check for, as a list of section IDs
         * @returns {boolean} true if the schedule is saved
         */
        publicApi.hasSavedSchedule = function(schedule) {
            schedule = angular.copy(schedule).sort();
            return utils.includesObject(privateApi.savedSchedules, schedule);
        };

        /**
         * @ngdoc method
         * @name getSavedSchedules
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Gets the saved schedules list
         *
         * @returns {number[][]} The list of saved schedules, where each schedule is a list of section IDs
         */
        publicApi.getSavedSchedules = function() {
            return privateApi.savedSchedules;
        };

        /**
         * @ngdoc method
         * @name requestSchedules
         * @methodOf norseCourse.service:schedulesService
         * @description
         *
         * Makes an async request to the schedule API based on the preferences
         * Requests 10 at a time, and automatically initiates next request, appending onto original results
         *
         * @param {object} loadingObj - object to keep track of the initial and full results status
         * @param {object} prefs - the schedule preferences to use; defaults to current preferencse
         * @param {number} index - the index into the schedules to request at, defaults to -1
         * @param {array} appendTo - the array to append the results onto
         * @returns {object} promise fulfilled by array of schedules
         */
        publicApi.requestSchedules = function(loadingObj, prefs, index, appendTo) {
            console.log('Requesting schedules');
            console.log('Prefs:', prefs);
            console.log('Index:', index);
            console.log('appendTo', appendTo);
            if (prefs === undefined) {
                prefs = angular.copy(privateApi.preferences);
            }
            if (index === undefined) {
                index = -1;
            }
            if (appendTo === undefined) {
                appendTo = [];
            }
                
            var deferred = $q.defer();

            var requiredSections = prefs.courses.filter(function(course) {
                return course.section && course.section.required;
            }).map(function(course) {
                return course.section.data.id;
            });

            var preferredSections = prefs.courses.filter(function(course) {
                return course.section && !course.section.required;
            }).map(function(course) {
                return course.section.data.id;
            });
            
            var requiredCourses = prefs.courses.filter(function(course) {
                return course.required;
            }).map(function(course) {
                return course.data.courseId;
            });

            var preferredCourses = prefs.courses.filter(function(course) {
                return !course.required;
            }).map(function(course) {
                return course.data.courseId;
            });

            var requiredGenEds = prefs.genEds.filter(function(genEd) {
                return genEd.required;
            }).map(function(genEd) {
                return genEd.data.abbreviation;
            });

            var preferredGenEds = prefs.genEds.filter(function(genEd) {
                return !genEd.required;
            }).map(function(genEd) {
                return genEd.data.abbreviation;
            });

            var urlParams = [
                'index=' + index,
                'minCredits=' + prefs.credits.min,
                'maxCredits=' + prefs.credits.max,
                'limit=10'
            ];

            if (requiredSections.length) {
                urlParams.push('requiredSections=' + requiredSections.join(','));
            }
            if (preferredSections.length) {
                urlParams.push('preferredSections=' + preferredSections.join(','));
            }
            if (requiredCourses.length) {
                urlParams.push('requiredCourses=' + requiredCourses.join(','));
            }
            if (preferredCourses.length) {
                urlParams.push('preferredCourses=' + preferredCourses.join(','));
            }
            if (requiredGenEds.length) {
                urlParams.push('requiredGenEds=' + requiredGenEds.join(','));
            }
            if (preferredGenEds.length) {
                urlParams.push('preferredGenEds=' + preferredGenEds.join(','));
            }

            var url = apiUrl + '/schedules?' + urlParams.join('&');
            console.log('Schedules request url:', url);

            $http.get(url).success(function(data) {
                if (data[0].error === 'No errors') {
                    console.log(data);
                    angular.forEach(data, function(schedule) {
                        appendTo.push(schedule);
                    });
                    loadingObj.initial = false;
                    deferred.resolve(appendTo);
                    if (data.length === 10) {
                        console.log('Requesting more schedules');
                        publicApi.requestSchedules(loadingObj, prefs, data[data.length-1].index, appendTo);
                    } else {
                        loadingObj.full = false;
                    }
                } else {
                    loadingObj.initial = false;
                    loadingObj.full = false;
                    deferred.reject(data[0].error);
                }
            }).error(function(data) {
                console.log(data);
                deferred.reject();
            });
            
            return deferred.promise;
        };

        return publicApi;
    });
})();
