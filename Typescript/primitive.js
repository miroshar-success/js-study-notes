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
