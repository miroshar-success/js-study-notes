// --------------------------------- Types by Inference
var helloworld = 'hello World';
var user = {
    name: 'kyrie',
    id: 1
};
var UserAccount = /** @class */ (function () {
    function UserAccount(name, id) {
        this.name = name;
        this.id = id;
    }
    return UserAccount;
}());
var player = new UserAccount('kyrie', 1);
console.log('player:', player);
// -------------------------------------- You can use interface to annotate parameters and return values to functions
function getAdminUser() {
    return {
        name: 'hello',
        id: 10
    };
}
function deleteUser(user) {
}
deleteUser({ name: '你好', id: 20 });
function getLength(obj) {
    return obj.length;
}
getLength('123');
getLength(['1', '2', '3']);
function wrapInArray(obj) {
    if (typeof obj === 'string') {
        return [obj];
    }
    return obj;
}
wrapInArray('123');
wrapInArray(['1', '2', '3']);
function logPoint(p) {
    console.log(p.x + " - " + p.y);
}
var point = { x: 12, y: 26 };
logPoint(point);
