// Wrapping in IIFE (Immediately-invoked Function Expression)
(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    
    .controller('LunchCheckController', LunchCheckController);
    
    // Injecting $scope to protect code from minification
    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {

        // Defining and initializing variables on $scope
        $scope.commaSeparatedLunchItemsInput = "";
        $scope.message = "";

        $scope.evaluateMeal = function () {

            // Split input and store in mealItems array
            var mealItems = $scope.commaSeparatedLunchItemsInput.split(",");

            // Check if input is empty
            // If not, check number of items and set message accordingly
            if ($scope.commaSeparatedLunchItemsInput == "") {
                // Set color to red
                $scope.messageStyling = {"color" : "red"};
                $scope.inputStyling = {"border-color" : "red"};
                $scope.message = "Please enter data first";
            } else {
                // Set color to green
                $scope.messageStyling = {"color" : "lightgreen"};
                $scope.inputStyling = {"border-color" : "lightgreen"};

                if (mealItems.length <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }
            
        };
    }

})();