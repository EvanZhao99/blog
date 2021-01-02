
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

// 获取类型 typeof
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

// 获取类型 keyof
namespace d {
    interface Person {
        name: string;
        age: number
    }
    type P = keyof Person; 
    // type P = 'name' |'age'
}

// 批量定义属性 in
namespace e {
    interface Person {
        name: string,
        age: number
    }
    type PartPerson = {
        [key in keyof Person]?: Person[key]
    }

}