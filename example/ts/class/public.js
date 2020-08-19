var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.changeName = function (name) {
        this.name = name;
    };
    return User;
}());
var u = new User('liming');
u.changeName('zhanghua');
console.log(u.name);




