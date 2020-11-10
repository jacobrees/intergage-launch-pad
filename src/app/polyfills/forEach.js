/**
 * HTMLCollection prototype forEach - A for each call for a HTML collection
 * @param {fn} callBack: The function call back for each element
 */
HTMLCollection.prototype.forEach = function (callBack) {
  Array.prototype.slice.call(this).forEach(function (el, id) {
    callBack(el, id);
  });
}

/**
 * * IE Support
 * NodeList prototype forEach - A for each call for a Node List
 */
if (!('forEach' in NodeList.prototype)) {
  NodeList.prototype.forEach = function (callBack) {
    Array.prototype.slice.call(this).forEach(function (el, id) {
      callBack(el, id);
    });
  };
}