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


        publicApi.getCourseNoPromise= function(courseId) {
            return courseIdObjectMap[courseId];
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


	publicApi.queryApi = function(newValue,oldValue){
	    console.log('QUERYING API',newValue);
	    var deferred = $q.defer();
	    
	    var temp_array = [];
	    if (angular.isArray(newValue)){
		temp_array = newValue;
	    }else{
		temp_array = [newValue];
	    }

	    /** set up parameters object **/
	    //console.log('START setting up parameters');
	    var parameters = {};
	    //console.log(temp_array);

	    //TODO: make multiple api calls for each added course they add
	    
	    var keys = [];                      //may be in the wrong spot

	    angular.forEach(temp_array,function(chip){
		var type = chip.type + 's';//temporary fix for department. 
		console.log(chip, type);
		var id = '';		
		if (type !== 'keyword'){ //change to keywords in order to allow keywords. Right now we have a problem with the chips that's going to cause more issues than we want.
		
		    id = eval('chip.data.'+ chip.type+'Id');
		    console.log('Chip Id:', id);
		}else{
		    //console.log(type);
		    id = chip.data.text;
		};

		for(var k in parameters) keys.push(k);     // object.keys() isn't working

		if (keys.indexOf(type) === -1){
		    parameters[type] = [id];
		}else{
		    parameters[type].push(id);
		};
		keys = [];                      //may be in the wrong spot
		//console.log(parameters);
	    });
	    /** end set up parameters object **/

	    publicApi.getCourseAndSectionData(parameters).then(function(data){
		//console.log(data);
		deferred.resolve(data);
		console.log(data);
	    });
	    return deferred.promise;
	};
	    
	publicApi.getCourseAndSectionData = function(parameters){
	    //console.log('inCourseAndSectionData');
	    /**
	       parameters -> JSON Object that maps query parameters to arrays of id's 
	     **/
	    var deferred = $q.defer();
	    var requestString = 'SOMETHING';
	    var url = apiUrl + '/courses?'; 
	    console.log('apiUrl: ', url);
	    //section off into it's own function
	    console.log('parameters: ',parameters);
	    angular.forEach(parameters, function(value,key){
		//consol.log(
		if (key !== 'courses'){
		    url += key + '=';
		    angular.forEach(value, function(item){
			url += item + '%2C';
		    });
		    url = url.slice(0,-3)+"&";
		}
		
	    });
	    if (url === apiUrl + '/courses?'){ //no parameters other than courses
		url += 'genEds=123134';    //THIS IS A REALLY SHITTY QUICK FIX. LOOK AT THIS LATER.
	    }
	    url = url.slice(0,-1);
	    console.log(url);
	    $http.get(url).success(function(arrayOfCourses) {
		console.log('what the heck?');
		//console.log(arrayOfCourses.length);
		console.log(url);
		angular.forEach(parameters['courses'],function(courseId,index){
		    arrayOfCourses.push(publicApi.getCourseNoPromise(courseId));
		    /**publicApi.getCourse(courseId).then(function(course){
		        console.log('COURSE: ', course,courseId); // I might need this to not be a promise.
			arrayOfCourses.push(course);
		    });
		    **/
		    
		});

		console.log('ARRAY OF COURSES',arrayOfCourses);
		$q.all(arrayOfCourses.map(function(course) { //MAKING TOO MANY API CALLS
		    return publicApi.fetchSectionsByCourse(course);
		})).then(function(arrayOfSectionArrays) {
		    var matchingSections = [];
		    angular.forEach(arrayOfCourses,function(course,index){
			
			var obj = {};
			obj['info']={
			    'course':course,
			    'section':arrayOfSectionArrays[index],
			    'basicDisplay': getBasicDisplay(course,arrayOfSectionArrays[index])
			};
			matchingSections.push(obj);
			deferred.resolve(matchingSections);
		    });
				   
		});
	    });
	    return deferred.promise;
	    //$q.all(array of promises.
	};
	    
	publicApi.fetchSectionsByCourse = function(course){
	    //input: course object
	    var deferred = $q.defer();
	    var courseId = course.courseId; //check name
	    //var matchingSections =
	    var url = apiUrl + '/sections?courses='+courseId;
	    //console.log('IN SECTION FETCH: ', url);
	    $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject();
            });
            return deferred.promise;
        };


	    
	var getBasicDisplay= function(course,sectionArray){
	    console.log('Getting Basic Display',course.name);
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
		var temp = section.genEdFulfillments['0'];
		//console.log(temp);
		if( temp !== undefined){
		    res.mainGenEds = [section.genEdFulfillments['0'].abbreviation];
		}
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
		//console.log('Section Display');
		console.log('genEdDisplay(sectionArray)',sectionArray);
		var genEdArray = genEdDisplay(sectionArray);//firstSection.generalEdFulfillments; //gened objects
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
	    //first section and find it's
	    var genEdCounts = {};
	    var keys = [];                      
	    angular.forEach(sectionArray,function(section){
		
		//angular.forEach(genEdCounts,function(counts,genEd){ keys.push(genEd );});
		
		angular.forEach(section.genEdFulfillments,function(genEd){
		    console.log('FULFILLMENTS: ',section.genEdFulfillments);
		    
		    if (keys.indexOf(genEd.abbreviation) === -1){
			genEdCounts[genEd.abbreviation] = 1;
			keys.push(genEd.abbreviation);
		    }else{
			
			genEdCounts[genEd.abbreviation] += 1;
		    };
		});
	    });
	    
	    console.log('GenEdCounts:',genEdCounts);
	    //console.log(genEdCounts);	    
	    var arrayLength = sectionArray.length;
	    //console.log(arrayLength);
	    angular.forEach(genEdCounts,function(count, genEd){
		//console.log(count);
		if (count === arrayLength){
		    mainGenEds.push(genEd);
		}
		else{
		    console.log('extraGenEd being pushed ',genEd,count,arrayLength);
		    extraGenEds.push(genEd);
		};
	
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
	    //console.log(courseDescription);
	    //console.log(typeof courseDescription);
	    if (courseDescription==='nan'){
		res = 'No description included. Contact your advisor or the department head for more details.'; 
	    }
	    else
	    {
		res = courseDescription.substr(0,500);
	    };

	    return res;
	};

        return publicApi;
    });
})();



//* Insert and splitNode go together
