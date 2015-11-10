(function() {
    'use strict';
    angular.module('norseCourse').service('norseCourseService', function($q, $http, apiUrl) {
        var publicApi = {};

        var departments = [];
	var departmentIdMap = {}; //mapping of department abbreviation to id

	var genEds = [];
	var genEdIdMap = {};  // mapping of genEd abbreviation to id
	
	var courses = [];
	var courseIdMap = {};  //mapping of course name to id
	
        var genEdsRequest = $http.get(apiUrl + '/genEds');
        genEdsRequest.success(function(data) {
            genEds = data;
	    angular.forEach(data,function(genEd){
		genEdIdMap[genEd.abbreviation] = genEd.genEdId; 
	    });
        });

        var departmentsRequest = $http.get(apiUrl + '/departments');
        departmentsRequest.success(function(data) {
            departments = data;
	    angular.forEach(data,function(department){
		departmentIdMap[department.abbreviation] = department.departmentId; 
	    });
        });

        var coursesRequest = $http.get(apiUrl + '/courses');
        coursesRequest.success(function(data) {
            courses = data;
	    angular.forEach(data,function(course){
		courseIdMap[course.name] = course.courseId; 
	    });
        });

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
                url += 'required=' + requiredCourseIds.join(',') + '&';
            }
            if (preferredCourseIds.length) {
                url += 'preferred=' + preferredCourseIds.join(',') + '&';
            }
            if (requiredGenEdAbbreviations.length ||
                preferredGenEdAbbreviations.length) {
                url += 'genEds=' + requiredGenEdAbbreviations.concat(preferredGenEdAbbreviations).join(',') + '&';
            }

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).catch(function() {
                deferred.reject();
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
	    var deptId = department.data.abbreviation;
	    var matchingCourses= [];
	    //make query
	    deferred.resolve(matchingCourses);
	    return deferred.promise;
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



