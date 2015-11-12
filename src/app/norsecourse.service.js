(function() {
    'use strict';
    angular.module('norseCourse').service('norseCourseService', function($q, $http, apiUrl) {
        var publicApi = {};

        var departmentsReady = $q.defer();
        var departments = [];
	var departmentAbbreviationIdMap = {}; //mapping of department abbreviation to id
        var departmentIdObjectMap = {};

        var genEdsReady = $q.defer();
	var genEds = [];
	var genEdAbbreviationIdMap = {};  // mapping of genEd abbreviation to id
        var genEdIdObjectMap = {};

        var coursesReady = $q.defer();
	var courses = [];
	var courseNameIdMap = {};  //mapping of course name to id
        var courseIdObjectMap = {};
	
        var genEdsRequest = $http.get(apiUrl + '/genEds');
        genEdsRequest.success(function(data) {
            genEds = data;
	    angular.forEach(data,function(genEd){
		genEdAbbreviationIdMap[genEd.abbreviation] = genEd.genEdId; 
	    });
            genEdsReady.resolve();
        });

        var departmentsRequest = $http.get(apiUrl + '/departments');
        departmentsRequest.success(function(data) {
            departments = data;
	    angular.forEach(data,function(department){
		departmentAbbreviationIdMap[department.abbreviation] = department.departmentId; 
	    });
            departmentsReady.resolve();
        });

        var coursesRequest = $http.get(apiUrl + '/courses');
        coursesRequest.success(function(data) {
            courses = data;
	    angular.forEach(data,function(course){
		courseNameIdMap[course.name] = course.courseId; 
	    });
            coursesReady.resolve();
        });

        publicApi.getSection = function(sectionId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/sections/' + sectionId).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject();
            });
            return deferred.promise;
        };

        publicApi.getGenEd = function(genEdId) {
            var deferred = $q.defer();
            genEdsReady.promise.then(function() {
                deferred.resolve(genEdIdObjectMap[genEdId]);
            }).catch(function() {
                deferred.reject();
            });
            return deferred.promise;
        };

        publicApi.getDepartment = function(departmentId) {
            var deferred = $q.defer();
            departmentsReady.promise.then(function() {
                deferred.resolve(departmentIdObjectMap[departmentId]);
            }).catch(function() {
                deferred.reject();
            });
            return deferred.promise;
        };

        publicApi.getCourse = function(courseId) {
            var deferred = $q.defer();
            coursesReady.promise.then(function() {
                deferred.resolve(courseIdObjectMap[courseId]);
            }).catch(function() {
                deferred.reject();
            });
            return deferred.promise;
        };
        
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
                        if (course.name.toLowerCase().includes(queryText)) {
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
                case 'keyword':
                    results.push({
                        type: 'keyword',
                        data: {
                            name: queryText,
                            text: queryText
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

        publicApi.getSchedules = function(requiredCourses,
                                          preferredCourses,
                                          requiredGenEds,
                                          preferredGenEds) {
            var deferred = $q.defer();

            var requiredCourseIds = requiredCourses.map(function(course) {
                return course.data.courseId;
            });
            var preferredCourseIds = preferredCourses.map(function(course) {
                return course.data.courseId;
            });
            var requiredGenEdAbbreviations = requiredGenEds.map(function(genEd) {
                return genEd.data.abbreviation;
            });
            var preferredGenEdAbbreviations = preferredGenEds.map(function(genEd) {
                return genEd.data.abbreviation;
            });

            var url = apiUrl + '/schedules?'
            if (requiredCourseIds.length) {
                url += 'requiredCourses=' + requiredCourseIds.join(',') + '&';
            }
            if (preferredCourseIds.length) {
                url += 'preferredCourses=' + preferredCourseIds.join(',') + '&';
            }
            if (requiredGenEdAbbreviations.length ||
                preferredGenEdAbbreviations.length) {
                url += 'genEds=' + requiredGenEdAbbreviations.concat(preferredGenEdAbbreviations).join(',') + '&';
            }

            $http.get(url).success(function(data) {
                deferred.resolve(data);
                console.log(url);
            }).error(function() {
                deferred.reject();
                console.log(url);
            });
                         
            return deferred.promise;
        }

        publicApi.searchCourses = function(courseTerms) {
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve(courses.slice(0, 100));
            },  500);
            return deferred.promise;
        };
        publicApi.searchDepartments = function(departmentTerms){
	    var deferred = $q.defer();
	    setTimeout(function(){
		deferred.resolve(departments);
		      
	    }, 500);
	    return deferred.promise;
	};

	publicApi.fetchCoursesByDepartment = function(department){
	    var deferred = $q.defer();
	    var deptId = department.data.abbreviation; //poorly named
	    var matchingCourses= [];
	    //make query
	    deferred.resolve(matchingCourses);
	    return deferred.promise;
	};
	publicApi.fetchSectionsByCourse = function(course){
	    //input: course object
	    var deferred = $q.defer();
	    var courseId = course.id; //check name
	    var matchingSections = [];
	    var genEdsRequest = $http.get(apiUrl + '/section');
	};
	
	publicApi.foo= function(department){
	    var deferred = $q.defer();
	    var dept = department.data.abbreviation;
	    var matchingCourses = [];
	    angular.forEach(courses,function(course){
		//console.log(typeof course.name);
		if (course.name.startsWith(dept)){
		    matchingCourses.push(course);
		}

	    });
	    deferred.resolve( matchingCourses);
	    console.log(matchingCourses.length);

	    return deferred.promise;
	};
	
        return publicApi;
    });
})();



