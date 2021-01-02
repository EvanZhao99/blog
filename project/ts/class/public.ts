class User {
    constructor(public name: string) {

    }
    changeName(name: string) {
        this.name = name;
    }
}
let u = new User('liming');
u.changeName('zhanghua');
console.log(u.name);
