(function() {
    'use strict';
    angular.module('norseCourse').controller('test',function($scope) {
        $scope.name = 'world';
        $scope.dept = "Computer Science";
        $scope.class = "Senior Project";
        $scope.chips = ['computer science','math','physics','biology'];
        //$scope.toggleSidenav = function(menuId) {
        //    $mdSidenav(menuId).toggle();
        //};
    });
})();
