// Wrapping in IIFE (Immediately-invoked Function Expression)
(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope, $filter) {

        $scope.commaSeparatedLunchItemsInput = "";
        $scope.message = "";

        $scope.evaluateMeal = function () {

            var mealItems = $scope.commaSeparatedLunchItemsInput.split(",");
            console.log("mealItems = " + mealItems.length);

            if (mealItems.length <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }
            
        };

    }

})();