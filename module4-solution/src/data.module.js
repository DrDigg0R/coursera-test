(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService);


    //ShoppingListService.$inject = ['$q', '$timeout']
    function ShoppingListService($q, $timeout) {
    
        var service = this;

        service.getAllCategories = function () {

        }

        service.getItemsForCategory = function (categoryShortName) {

        }


    }
    
})();
    