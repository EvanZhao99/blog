
type logFn = (a: number | string) => void;
let log: logFn;
let log2 = function(a: number | string | boolean): void {

}
log = log2;

// 类型保护
namespace b {
    let user: {name: string} | null;
    // user = {
    //     name: ''
    // };
    // user.name = ''
    type User = {name: string};
    function getName(user: User | null): string {
        return (user as User).name;
    }
}

// 获取类型
namespace c {
    interface User {
        name: string
    }
    let user: User = {name: ''};
    type User2 = typeof user;
    // console.log(User2)
    let user2: User2 = {name: ''};
    let a = user2;

}