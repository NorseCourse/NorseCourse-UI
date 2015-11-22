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
		genEdIdObjectMap[genEd.genEdId] = genEd;
	    });
            genEdsReady.resolve();
        });

        var departmentsRequest = $http.get(apiUrl + '/departments');
        departmentsRequest.success(function(data) {
            departments = data;
	    angular.forEach(data,function(department){
		departmentAbbreviationIdMap[department.abbreviation] = department.departmentId; 
		departmentIdObjectMap[department.departmentId] = department;
	    });
            departmentsReady.resolve();
        });

        var coursesRequest = $http.get(apiUrl + '/courses');
        coursesRequest.success(function(data) {
            courses = data;
	    angular.forEach(data,function(course){
		courseNameIdMap[course.name] = course.courseId;
		courseIdObjectMap[course.courseId] = course;
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
                                type: 'department',
                                data: department,
				display: 'dept'
                            });
                        }
                    });
                    break;
                case 'course':
                    angular.forEach(courses, function(course) {
                        if (course.name.toLowerCase().includes(queryText)) {
                            results.push({
                                type: 'course',
                                data: course,
				display: 'course'
                            });
                        }
                    });
                    break;
		case 'gen ed':
                    angular.forEach(genEds, function(genEd) {
                        if (genEd.abbreviation.toLowerCase().includes(queryText) ||
                            genEd.name.toLowerCase().includes(queryText)) {
                            results.push({
                                type: 'genEd',
                                data: genEd,
				display: 'gen ed'
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
                        },
			display: 'keyword'
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

	    var url = apiUrl + '/schedules?';

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

	publicApi.fetchSectionsByCourse = function(course){
	    //input: course object
	    var deferred = $q.defer();
	    var courseId = course.courseId; //check name
	    //var matchingSections =
	    var url = apiUrl + '/sections?courses='+courseId;
	    console.log('IN SECTION FETCH: ', url);
	    $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject();
            });
            return deferred.promise;
        };

	    
	publicApi.getCourseAndSectionData = function(parameters){
	    /**
	       parameters -> JSON Object that maps query parameters to arrays of id's 
	     **/
	    var deferred = $q.defer();
	    /**
	       Try to make this so that is can take parameters that aren't 
	       just departments. Maybe allow it a similar functionality to 
	       autocomplete. Once you enter in search terms, query the api 
	       based on those. This will require further understanding of 
	       how the api works. Anyway, supposing this just works for 
	       department, you'll call fetchCoursesByDepartment followed by
	       fetchSectionsbyCourse. Combining this into a single object
	       with all of the information, an array of complete course info
	       will be supplied to the ui.
	    **/
	    var requestString = 'SOMETHING';
	    
	    var url = apiUrl + '/courses?'; 

	    //section off into it's own function
	    angular.forEach(parameters, function(value,key){
		url += key + '=';
		angular.forEach(value, function(item){
		    url += item + '%2C';
		});
		url = url.slice(0,-3)+"&";
	    });
	    
	    url = url.slice(0,-1);
	    console.log(url);
	    $http.get(url).success(function(arrayOfCourses) {
		console.log(arrayOfCourses);
		$q.all(arrayOfCourses.map(function(course) { //MAKING TOO MANY API CALLS
		    return publicApi.fetchSectionsByCourse(course);
		})).then(function(arrayOfSectionArrays) {
		    var matchingSections = [];
		    angular.forEach(arrayOfCourses,function(course,index){
			
			var obj = {};
			obj['info']={
			    'course':course,
			    'section':arrayOfSectionArrays[index],
			    'basic_display': getBasicDisplay(course,arrayOfSectionArrays[index])
			};
			matchingSections.push(obj);
			deferred.resolve(matchingSections);
		    });
				   
		});
	    });
	    return deferred.promise;
	    //$q.all(array of promises.
	};
	
	var getBasicDisplay= function(course,sectionArray){
	    /**What do I wanto display?
	       Course name
	       Section shorttitle. Not sure how to best do this
	       Gen_eds (Could I color the ones that are offered by all differently?
	       Latest Term
	       
	     **/
	    var res = {};
	    res.name=course.name;
	    res.description = course.description;
	    
	    if (sectionArray.length === 1 ){
		var section = sectionArray[0];
		res.title = section.shortTitle;
		res.mainGenEds = section.generalEducationFulfillments;
		res.term = section.term;
		res.extraGenEds=null;
	    }
	    else{
		var firstSection = sectionArray[0];
		var foo = function(item){
		    return item.shortTitle === firstSection.shortTitle;
		};
		if (sectionArray.every(foo)){
		    res['title']=firstSection.shortTitle;
		}
		else{
		    res['title']='Click for Details';
		}

		res.mainGenEds = firstSection.generalEducationFulfillments; //gened objects
		res.term = firstSection.term;
		res.extraGenEds =null;
		

	    }

	    return res;
	    
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
	    //console.log(matchingCourses.length);

	    return deferred.promise;
	};
	
        return publicApi;
    });
})();



