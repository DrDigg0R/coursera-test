(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope, $filter) {

        $scope.commaSeparatedLunchItemsInput = "";

        $scope.evaluateMeal = function () {

            var mealItems = $scope.commaSeparatedLunchItemsInput.split(", ");
            console.log("mealItems = " + mealItems);
        };

    }

})();