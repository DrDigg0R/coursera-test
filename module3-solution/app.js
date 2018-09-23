(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
//.service('MenuSearchService', MenuSearchService)
.factory('MenuSearchFactory', MenuSearchFactory)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      narrowCtrl: '<narrowCtrl',
      onRemove: '&'
     },
    // controller: NarrowItDownController,
    // controllerAs: 'narrowCtrl',
    // bindToController: true
  };
  return ddo;

} // End FoundItems directive


NarrowItDownController.$inject = ['MenuSearchFactory'];
function NarrowItDownController(MenuSearchFactory) {
  var narrowCtrl = this;
  narrowCtrl.found = [];
  narrowCtrl.searchTerm = "";

  // Use MenuSearchFactory to create new MenuSearchService
  var menuSearchService = MenuSearchFactory();
  
  narrowCtrl.narrowItDown = function () {
    var promise = menuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
  
    promise.then(function (response) {
      narrowCtrl.found = response;
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });  
  };

  narrowCtrl.removeItem = function (itemIndex) {
    menuSearchService.removeItem(itemIndex);
  };

} // End NarrowItDownController

MenuSearchService.$inject = ['ApiBasePath', '$http'];
function MenuSearchService(ApiBasePath, $http) {

  var menuSearchService = this;

  menuSearchService.getMatchedMenuItems = function (searchTerm) {

    menuSearchService.foundItems = [];

    var response = $http.get(ApiBasePath + "/menu_items.json")
    .then(function (result) {
      // process result and only keep items that match

      for (var i = 0; i < result.data.menu_items.length; i++) {
        var curItemDescription = result.data.menu_items[i].description;
        
        if (curItemDescription.toLowerCase().indexOf(searchTerm) !== -1) {
          menuSearchService.foundItems.push(result.data.menu_items[i]);
        }
      }

      return menuSearchService.foundItems;
    }, function (error) {
      console.log("Error Messsage = " + error);
    }); // End .then
    return response;
  } // End getMatchedMenuItems()

  menuSearchService.removeItem = function (itemIndex) {
    menuSearchService.foundItems.splice(itemIndex, 1);
  };

} // End MenuSearchService

MenuSearchFactory.$inject = ['ApiBasePath', '$http'];
function MenuSearchFactory(ApiBasePath, $http) {
  var factory = function () {
    return new MenuSearchService(ApiBasePath, $http);
  };

  return factory;
} // End MenuSearchFactory

})();