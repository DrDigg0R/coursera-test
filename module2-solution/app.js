(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();

  buyList.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
 
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var buyItems = [
    {name: "cookies", quantity: "10"},
    {name: "chocolate", quantity: "5"},
    {name: "potato chips", quantity: "20"},
    {name: "chillies", quantity: "7"},
    {name: "soda", quantity: "13"}];

  var boughtItems = [];
    buyItems.length
  service.boughtItem = function (itemIndex) {
    
    var item = {
      name: buyItems[itemIndex].name,
      quantity: buyItems[itemIndex].quantity
    };
    boughtItems.push(item);
    buyItems.splice(itemIndex, 1);
  };

  service.getBuyItems = function () {
    return buyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();