(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'narrowedList.html',
    scope: {
      onRemove: "&"
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowCtrl',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowCtrl = this;
  var found = [];
  

  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function(response) {
    //narrowCtrl.found = response.data;
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })

  console.log(found);

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {

  var menuService = this;

  menuService.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];

      for (var i = 0; i < result.data.menu_items.length; i++) {
        var curItemDescription = result.data.menu_items[i].description;
        
        if (curItemDescription.toLowerCase().indexOf("chicken") !== -1) {
          foundItems.push(result.data.menu_items[i]);
        }
      }

      console.log("FoundItems in MenuSearchService:" + foundItems);

      return foundItems;
    });

    return response;
  };

}

})();