namespace a{
    interface UserInterface {
        [index: number]: string;
    }
    let arr: UserInterface = ['1', '2']
}

namespace b{
    class Animal{
        construtor( name: string) {
        }
    }
    interface WithNameClass {
        new(name: string): Animal
    }
    function createAnimal(clazz: WithNameClass, name: string) {
        return new clazz(name);
    }
    let a = createAnimal(Animal,'name');
}

namespace c {
    class MyArray<T>{
        private list: T[] = [];
        add(val: T) {
            this.list.push(val);
        }
        getMax(): T {
            let result: T = this.list[0];
            for(let i = 1; i < this.list.length; i++) {
                if(result < this.list[i]) {
                    result = this.list[i];
                }
            }
            return result;
        }
    }
    let arr = new MyArray<number>();
    arr.add(1); arr.add(2); arr.add(3);
    let result: number = arr.getMax();
    console.log(result)
}

namespace d{
    interface Calculate{
        <T>(a: T, b: T): T
    }
    let add: Calculate = function <T>(a: T, b: T) {
        return a;
    }
    add(1, 2)
}