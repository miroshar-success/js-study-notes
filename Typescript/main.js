"use strict";
var UtilA;
(function (UtilA) {
    function isString(value) {
        return typeof value === 'string';
    }
    UtilA.isString = isString;
})(UtilA || (UtilA = {}));
var UtilObject;
(function (UtilObject) {
    const a = isString('a');
    console.log(a);
})(UtilObject || (UtilObject = {}));
