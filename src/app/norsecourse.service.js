/**
 *@ngdoc service
 *@name norseCourse.service:norseCourseService
 *@description
 * 
 *This service contains functions for use by various controllers. These miscellaneous function make api calls to gather information from the database.
 */

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

	var facultyReady = $q.defer() ;
	var faculty = [];
	var facultyLastNameIdMap = {};
	var facultyIdObjectMap = {};

        var sectionIdObjectMap = {}; // stores sections after they're first retrieved

	var facultyRequest = $http.get(apiUrl + '/faculty');
	facultyRequest.success(function(data){
	    faculty = data;
	    angular.forEach(data,function(fac){
		facultyLastNameIdMap[fac.lastName] = fac.facultyId;
		facultyIdObjectMap[fac.facultyId] = faculty;
	    });
	    facultyReady.resolve();
	});
			       

	
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
	
	/**
	 *@ngdoc method
	 *@name getSection
	 *@methodOf norseCourse.service:norseCourseService
	 *@description
	 *
	 *This function takes a sectionIf and makes an api request for that section
	 *
	 *@param {int} sectionId This is the section id! 
	 */
        publicApi.getSection = function(sectionId) {
            var deferred = $q.defer();

            if (sectionIdObjectMap.hasOwnProperty(sectionId)) {
                deferred.resolve(sectionIdObjectMap[sectionId]);
            } else {
                $http.get(apiUrl + '/sections/' + sectionId).success(function(data) {
                    sectionIdObjectMap[sectionId] = data;
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject();
                });
            }
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
	publicApi.getGenEdNoPromise = function(genEdId){  //no promise because I need this done in sequential order
	    return genEdIdObjectMap[genEdId];
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


        publicApi.getCourseNoPromise= function(courseId) {
            return courseIdObjectMap[courseId];
        };
	
        publicApi.autocompleteQuery = function(queryText, types) {
            var deferred = $q.defer();
            queryText = queryText.toLowerCase();
            var results = [];
            angular.forEach(types, function(type) {
                switch(type) {
		case 'faculty':
		    angular.forEach(faculty, function(fac) {
			if (fac.lastName.toLowerCase().includes(queryText)){
			    results.push({
				type: 'faculty',
				data: fac,
				display: 'prof'
			    });
			}
		    });
				    break;
                case 'dept':
                    angular.forEach(departments, function(department) {
                        if (department.abbreviation.toLowerCase() === queryText ||
                            department.name.toLowerCase() === queryText) {
                            results.unshift({
                                type: 'department',
                                data: department,
                                display: 'dept'
                            });
                        } else if (department.abbreviation.toLowerCase().includes(queryText) ||
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
                        if (course.name.toLowerCase() === queryText ||
                            course.title.toLowerCase() === queryText) {
                            results.unshift({
                                type: 'course',
                                data: course,
                                display: 'course'
                            });
                        } else if (course.name.toLowerCase().includes(queryText) ||
                            course.title.toLowerCase().includes(queryText)) {
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
                        if (genEd.abbreviation.toLowerCase() === queryText ||
                            genEd.name.toLowerCase === queryText) {
                            results.unshift({
                                type: 'genEd',
                                data: genEd,
                                display: 'gen ed'
                            });
                        } else if (genEd.abbreviation.toLowerCase().includes(queryText) ||
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
                                          preferredGenEds,
                                          numCourses) {
            var deferred = $q.defer();

            if (numCourses === null || numCourses === undefined) {
                numCourses = 4;
            }

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
            if (requiredGenEdAbbreviations.length) {
                url += 'requiredGenEds=' + requiredGenEdAbbreviations.join(',') + '&';
            }
            if (preferredGenEdAbbreviations.length) {
                url += 'preferredGenEds=' + preferredGenEdAbbreviations.join(',') + '&';
            }
            url += 'numCourses=' + numCourses + '&';

            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject();
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


	publicApi.queryApi = function(newValue,oldValue){
	    var deferred = $q.defer();
	    
	    var chip_array = [];
	    if (angular.isArray(newValue)){
		chip_array = newValue;
	    }else{
		chip_array = [newValue];
	    }

	    /** set up parameters object **/
	    //console.log('START setting up parameters');
	    console.log('chip_array: ',chip_array);
	    var parameters = {};  //what happens if I try and add the types right now?
	    console.log(chip_array);

	    //TODO: make multiple api calls for each added course they add
	    
	    var keys = [];                      //may be in the wrong spot
	    var dumbyDeferred = $q.defer();
	    dumbyDeferred.resolve();
	   

	    var allPromises = [dumbyDeferred.promise];
	    angular.forEach(chip_array,function(chip){
                //If faculty, query section api, find sections, and then find courses associated with them.
		// add those courseIds to the courses parameter.
		var facultyPromises = [dumbyDeferred.promise];
		var dumbyDeferred2 = $q.defer();
		allPromises.push(dumbyDeferred2.promise);
		
		var type = '';
		var chipType = '';
		console.log('chip type = ',chip.type);
		if (chip.type === 'faculty'){
		    console.log('received faculty');
		    var facId = chip.data.facultyId;
		    type = 'courses';
		    chipType = 'course';
		    var url = apiUrl + '/sections?facultyId=' + facId; //%2C
		    console.log('URL: ', url);
		    var facultyPromise = $http.get(url);
		    facultyPromises.push(facultyPromise); //adds a single promise to be popped later
		    allPromises.push(facultyPromise);
		    //make request for those faculty. 
		}

		else{
		    type = chip.type + 's';//temporary fix for department. 
		    chipType = chip.type;
		}
		parameters[type]=[];

		$q.all(facultyPromises).then(function(data) {
		    data.shift();
		    console.log(data);
		    
		    var id = '';		
		    if (type !== 'keywords'){ //change to keywords in order to allow keywords. Right now we have a problem with the chips that's going to cause more issues than we want.
			id = eval('chip.data.'+ chipType+'Id');
		    }else{
			//console.log(type);
			id = chip.data.text;
		    }
		    //console.log('chip: ', chip);
		    //console.log('id: ', id);
		    
		    if (data.length !== 0){
			angular.forEach(data[0].data, function(course){
			    parameters[type].push(course.courseId);
			    //if (parameters['courseIsFaculty'] === undefined){
			//	parameters['courseIsFaculty'] =[1];
			   // } else {
			//	parameters['courseIsFaculty'].push(1);
			  //  };//course is faculty?
			});
		    }
		    //console.log(parameters);		
		    for(var k in parameters) keys.push(k);     // object.keys() isn't working
		    console.log(type, id);
		    if (id !== undefined){
			//if (keys.indexOf(type) === -1){
			//    parameters[type] = [id];
			//}else{
			    parameters[type].push(id);
			//}
		    }
		    keys = [];
		    dumbyDeferred2.resolve();
		    facultyPromises.pop();//console.log(parameters);			     
		});//may be in the wrong spot

		
		
	    });
	    /** end set up parameters object **/
	    
	    /** beware of the shitty fix for the ansych nature of all this.**/
	    $q.all(allPromises).then(function(temp){
		console.log('parameters object: ', parameters);
		publicApi.getCourseAndSectionData(parameters).then(function(data){
		    console.log(data);
		    deferred.resolve(data);
		});
		//console.log(data);
	    
		
	    });
	    return deferred.promise;
	};
	    
	publicApi.getCourseAndSectionData = function(parameters){
	    //console.log('inCourseAndSectionData');
	    /**
	       parameters -> JSON Object that maps query parameters to arrays of id's 
	    **/
	    console.log('parameters: ',parameters);
	    var deferred = $q.defer();
	    var url = apiUrl + '/courses?'; 
	    var searchArray = [];
	    
	    //construct Url string
	    angular.forEach(parameters, function(value,key){
		console.log(key,value);
		if (key !== 'courses'){
		    url += key + '=';
		    angular.forEach(value, function(item){
			print('item: ', item);
			url += item + '%2C';
		    });
		    url = url.slice(0,-3)+"&";
		}

	    });
	    
	    if (url === apiUrl + '/courses?'){ //no parameters other than courses
		url += 'genEds=0000001'; // quick fix   
	    }
	    url = url.slice(0,-1);

	    
	    $http.get(url).success(function(arrayOfCourses) {
		console.log('COURSES: ',parameters.courses);
		angular.forEach(arrayOfCourses,function(course,index){
		    if (parameters.courses === undefined){
			searchArray.push(course);
		    }
		    else if (parameters.courses.indexOf(course.courseId) !== -1 ){
			searchArray.push(course);
		    }
		    
	
		});

		var appendArray = [];
		angular.forEach(parameters.courses,function(courseId,index){
		    //right here I'm adding in all the extra course ids. if they are faculty related, I want the intersection.
		    var found = false;

		    if (arrayOfCourses.length === 0){
			found = true;
		    };
		    angular.forEach(searchArray, function(course,index){
			if (courseId === course){
			    found = true;
			};
		    });
		    if (found){
			appendArray.push(publicApi.getCourseNoPromise(courseId));
		    }


		    
		});

		angular.forEach(appendArray,function(course){
		    searchArray.push(course);
		});
		
		console.log("ARRAYS: ", searchArray,arrayOfCourses,parameters.courses);
		//console.log('ARRAY OF COURSES',arrayOfCourses);
		$q.all(searchArray.map(function(course) { //MAKING TOO MANY API CALLS
		    return publicApi.fetchSectionsByCourse(course);
		})).then(function(arrayOfSectionArrays) {
		    var matchingSections = [];
		    
		    var resultsArray = setifyCourses(searchArray);

		    
		    if (Object.getOwnPropertyNames(resultsArray).length > 0){
		    //if (resultsArray[0] !== undefined ){
			
			angular.forEach(resultsArray,function(course,index){
			    
			    var obj = {};
			    obj.info={
				'course':course,
				'section':arrayOfSectionArrays[index],
				'basicDisplay': getBasicDisplay(course,arrayOfSectionArrays[index])
			    };
			    matchingSections.push(obj);
			    deferred.resolve(matchingSections);
			});
		    }
		    else {
			deferred.resolve([{'empty':true}]);
		    };
		    
		});
	    });
	    var res = deferred.promise;

	    return res;
	};


	var setifyCourses = function(someArray){
	    var res = {};
	    angular.forEach(someArray, function(item,index) {
		var found = false;
		angular.forEach(res,function(courseSection,index) {
		    if (courseSection.courseId == item.courseId){
			found = true;
		    }
		});
		if (!found) {

		    res[index]=item;
		};
		found = false;
		
	    });
	    console.log("Setify Results", res);
	    return res;
	};
	    


	
	publicApi.fetchSectionsByCourse = function(course){
	    var deferred = $q.defer();
	    var courseId = course.courseId; //check name
	    var url = apiUrl + '/sections?courses='+courseId;

	    $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject();
            });
            return deferred.promise;
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
	    res.description = descriptionDisplay(course.description);//course.description;

	    if (sectionArray.length === 1 ){
		var section = sectionArray[0];
		res.title = section.shortTitle;
		res.term = section.term;
		res.mainGenEds = genEdDisplay(sectionArray)[0];
		res.extraGenEds=genEdDisplay(sectionArray)[1];
	    }
	    else{
		var firstSection = sectionArray[0];
		var genEdArray = genEdDisplay(sectionArray);//firstSection.generalEdFulfillments; //gened objects
		res.title= course.title;
		res.mainGenEds = genEdArray[0];
		res.extraGenEds = genEdArray[1]; 
		res.term = firstSection.term;
		res.extraGenEds =null;
		

	    }
	    return res;
	    
	};

	var genEdDisplay = function(sectionArray){
	    var mainGenEds = [];
	    var extraGenEds = [];
	    var genEdCounts = {};
	    var keys = [];                      
	    angular.forEach(sectionArray,function(section){
		//angular.forEach(genEdCounts,function(counts,genEd){ keys.push(genEd );});
		
		angular.forEach(section.genEdFulfillments,function(genEd){
		   		    
		    if (keys.indexOf(genEd.id) === -1){ //changing these to genEdId. might not work
			genEdCounts[genEd.id] = 1;
			keys.push(genEd.id);
		    }else{
			
			genEdCounts[genEd.id] += 1;
		    }
		});
	    });
	    var arrayLength = sectionArray.length;
	    

	    angular.forEach(genEdCounts,function(count, genEdId){

		if (count === arrayLength){
		    mainGenEds.push(publicApi.getGenEdNoPromise(genEdId));
		}
		else{
		    extraGenEds.push(publicApi.getGenEdNoPromise(genEdId));
		}
	
	    });
	    return [mainGenEds,extraGenEds];
	    
	};
	var nthIndex = function(str, pat, n){
	    var L= str.length, ind= -1;
	    while(n-- && ind++<L){
		i= str.indexOf(pat, ind);
	    }
	    return i;
	};
	var descriptionDisplay = function(courseDescription){
	    var res = '';
	    	    //console.log(typeof courseDescription);
	    res = courseDescription;
	    if (courseDescription==='nan'){
		res = 'No description included. Contact your advisor or the department head for more details.'; 
	    }
	    
	    
	    return res;
	};

        return publicApi;
    });
})();



//* Insert and splitNode go together
