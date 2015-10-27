(function() {
    'use strict';
    angular.module('norseCourse').service('norseCourseService', function($q, $http) {
        var publicApi = {};

        var departments = [
            {
                abbreviation: 'CS',
                name: 'Computer Science'
            },
            {
                abbreviation: 'BIO',
                name: 'Biology'
            },
            {
                abbreviation: 'CHEM',
                name: 'Chemistry'
            },
            {
                abbreviation: 'LING',
                name: 'Linguistics'
            },
            {
                abbreviation: 'SOC',
                name: 'Sociology'
            },
            {
                abbreviation: 'MATH',
                name: 'Mathematics'
            }
        ];

        var genEds = [
            {
                abbreviation: 'NWNL',
                name: 'Natural World Non-lab'
            },
            {
                abbreviation: 'NWL',
                name: 'Natural World Lab'
            },
            {
                abbreviation: 'QUANT',
                name: 'Quantitative'
            },
            {
                abbreviation: 'HE',
                name: 'Human Expression'
            }
        ];

        var courses = [
            {
                name: 'CS 420',
                description: 'Machine learning: topics include neural nets, classifiers, etc'
            },
            {
                name: 'CS 440',
                description: 'Database management systems'
            }
        ];

        publicApi.autocompleteQuery = function(queryText, types) {
            var deferred = $q.defer();

            queryText = queryText.toLowerCase();
            var results = [];
            angular.forEach(types, function(type) {
                switch(type) {
                case 'dept':
                    angular.forEach(departments, function(department) {
                        if (department.abbreviation.toLowerCase().includes(queryText) ||
                            department.name.toLowerCase().includes(queryText)) {
                            results.push({
                                type: 'dept',
                                data: department
                            });
                        }
                    });
                    break;
                case 'course':
                    angular.forEach(courses, function(course) {
                        if (course.name.toLowerCase().includes(queryText) ||
                            course.description.toLowerCase().includes(queryText)) {
                            results.push({
                                type: 'course',
                                data: course
                            });
                        }
                    });
                    break;
                case 'gen ed':
                    angular.forEach(genEds, function(genEd) {
                        if (genEd.abbreviation.toLowerCase().includes(queryText) ||
                            genEd.name.toLowerCase().includes(queryText)) {
                            results.push({
                                type: 'gen ed',
                                data: genEd
                            });
                        }
                    });
                    break;
                default:
                    // do nothing
                }
            });
            deferred.resolve(results);
            
            return deferred.promise;
        };
        
        return publicApi;
    });
})();
