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
            }
        };

        publicApi.addRequiredCourse = function(course) {
            if (!publicApi.hasCourse(course)) {
                privateApi.requiredCourses.push(course);
            }
        };

        publicApi.addPreferredGenEd = function(genEd) {
            if (!publicApi.hasGenEd(genEd)) {
                privateApi.preferredGenEds.push(genEd);
            }
        };

        publicApi.addRequiredGenEd = function(genEd) {
            if (!publicApi.hasGenEd(genEd)) {
                privateApi.requiredGenEds.push(genEd);
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
                        return;
                    }
                }
            }
        };

        publicApi.removePreferredCourse = function(course) {
            if (publicApi.hasPreferredCourse(course)) {
                for (var i = 0; i < privateApi.preferredCourses.length; i++) {
                    if (angular.equals(privateApi.preferredCourses[i], course)) {
                        privateApi.preferredCourses.splice(i, 1);
                        return;
                    }
                }
            }
        };

        publicApi.removeCourse = function(course) {
            publicApi.removePreferredCourse(course);
            publicApi.removeRequiredCourse(course);
        };

        publicApi.removeRequiredGenEd = function(genEd) {
            if (publicApi.hasRequiredGenEd(genEd)) {
                for (var i = 0; i < privateApi.requiredGenEds.length; i++) {
                    if (angular.equals(privateApi.requiredGenEds[i], genEd)) {
                        privateApi.requiredGenEds.splice(i, 1);
                        return;
                    }
                }
            }
        };

        publicApi.removePreferredGenEd = function(genEd) {
            if (publicApi.hasPreferredGenEd(genEd)) {
                for (var i = 0; i < privateApi.preferredGenEds.length; i++) {
                    if (angular.equals(privateApi.preferredGenEds[i], genEd)) {
                        privateApi.preferredGenEds.splice(i, 1);
                        return;
                    }
                }
            }
        };

        publicApi.removeGenEd = function(genEd) {
            publicApi.removePreferredGenEd(genEd);
            publicApi.removeRequiredGenEd(genEd);
        };
        
    });
})();
