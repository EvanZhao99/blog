// 1. 为什么是 number | string
// interface StringIndexArray {
//     [index: string]: string;
// }
// type K = keyof StringIndexArray;


// 2. keyof 获取类型的所以键
namespace B {
    class Person {
        name: string = 'name'
    }

    let sname: keyof Person;
    sname = 'name'
    console.log(sname)
}

namespace C {
    type Omic<T, K extends any> = Pick<T, Exclude<keyof T, K>>
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P]
    }
    type Exclude<T, K> = T extends K ? never : T;
}
// import voice from './module/voice';
// voice.open();
import('./module/voice').then(function() {
    
})