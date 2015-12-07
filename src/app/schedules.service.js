(function() {
    'use strict';
    angular.module('norseCourse').service('schedulesService', function() {
        var privateApi = {
            preferredCourses: [],
            requiredCourses: [],
            preferredGenEds: [],
            requiredGenEds: []
        };

        var publicApi = {};

        publicApi.getPreferredCourses = function() {
            return privateApi.preferredCourses;
        };

        publicApi.getRequiredCourses = function() {
            return privateApi.requiredCourses;
        };

        publicApi.getPreferredGenEds = function() {
            return privateApi.preferredGenEds;
        };

        publicApi.getRequiredGenEds = function() {
            return privateApi.requiredGenEds;
        };

        publicApi.addPreferredCourse = function(course) {
            if (!publicApi.hasCourse(course)) {
                privateApi.preferredCoruses.push(course);
                return true;
            } else {
                return false;
            }
        };

        publicApi.addRequiredCourse = function(course) {
            if (!publicApi.hasCourse(course)) {
                privateApi.requiredCourses.push(course);
                return true;
            } else {
                return false;
            }
        };

        publicApi.addPreferredGenEd = function(genEd) {
            if (!publicApi.hasGenEd(genEd)) {
                privateApi.preferredGenEds.push(genEd);
                return true;
            } else {
                return false;
            }
        };

        publicApi.addRequiredGenEd = function(genEd) {
            if (!publicApi.hasGenEd(genEd)) {
                privateApi.requiredGenEds.push(genEd);
                return true;
            } else {
                return false;
            }
        };

        publicApi.hasRequiredCourse = function(course) {
            for (var i = 0; i < privateApi.requiredCourses.length; i++) {
                if (angular.equals(privateApi.requiredCourses[i], course)) {
                    return true;
                }
            }
            return false;
        };

        publicApi.hasPreferredCourse = function(course) {
            for (var i = 0; i < privateApi.preferredCourses.length; i++) {
                if (angular.equals(privateApi.preferredCourses[i], course)) {
                    return true;
                }
            }
            return false;
        };

        publicApi.hasCourse = function(course) {
            return (publicApi.hasRequiredCourse(course) ||
                    publicApi.hasPreferredCourse(course));
        };

        publicApi.hasRequiredGenEd = function(genEd) {
            for (var i = 0; i < privateApi.requiredGenEds.length; i++) {
                if (angular.equals(privateApi.requiredGenEds[i], genEd)) {
                    return true;
                }
            }
            return false;
        };

        publicApi.hasPreferredGenEd = function(genEd) {
            for (var i = 0; i < privateApi.preferredGenEds.length; i++) {
                if (angular.equals(privateApi.preferredGenEds[i], genEd)) {
                    return true;
                }
            }
            return false;
        };

        publicApi.hasGenEd = function(genEd) {
            return (publicApi.hasRequiredGenEd(genEd) ||
                    publicApi.hasPreferredGenEd(genEd));
        };

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

        publicApi.removeCourse = function(course) {
            var foo = publicApi.removePreferredCourse(course);
            var bar = publicApi.removeRequiredCourse(course);
            return foo || bar;
        };

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

        publicApi.removeGenEd = function(genEd) {
            var foo = publicApi.removePreferredGenEd(genEd);
            var bar = publicApi.removeRequiredGenEd(genEd);
            return foo || bar;
        };

        return publicApi;
    });
})();
