(function() {
    'use strict';
    angular.module('norseCourse').service('norseCourseService', function($q, $http, apiUrl) {
        var publicApi = {};

        var departments = [];
        var genEds = [];
        var courses = [];

        var genEdsRequest = $http.get(apiUrl + '/genEds');
        genEdsRequest.success(function(data) {
            genEds = data;
        });

        var departmentsRequest = $http.get(apiUrl + '/departments');
        departmentsRequest.success(function(data) {
            departments = data;
        });

        var coursesRequest = $http.get(apiUrl + '/courses');
        coursesRequest.success(function(data) {
            courses = data;
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

	publicApi.foo= function(department){
	    var deferred = $q.defer();
	    var dept = department.data.abbreviation
	    var matchingCourses = [];
	    angular.forEach(courses,function(course){
		//console.log(typeof course.name);
		if (course.name.startsWith(dept)){
		    console.log('here');
		    matchingCourses.push(course);
		};

	    });
	    deferred.resolve( matchingCourses);
	    console.log(matchingCourses.length)
	    return deferred.promise;
	    //include an angular ForEach Here
	    //var dept = department.abbreviation
	    //resultingDepartments.append(item)
	    //for item in courses:
	    //   if item.id.startswith (or includes, or indexOf):
	    //        resultingDepartments.append(item)
	    
	};
	
        return publicApi;
    });
})();
