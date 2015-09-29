(function() {
    'use strict';
    angular.module('norseCourse').controller('test',function($scope) {
        $scope.name = 'world';
        $scope.chips = ['hey','there'];
        //$scope.toggleSidenav = function(menuId) {
        //    $mdSidenav(menuId).toggle();
        //};
    });
})();
