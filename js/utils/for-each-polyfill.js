// forEach polyfill for IE11
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
(function () {
  'use strict';

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
})();
