// type A = [string, number, boolean];
type A = {1: string, 2: number, 3: boolean};
enum C {
 string,
 number,
 boolean
}
// type B<T> = [{default: T[0]}]
// type Transform<T> = [
//     []:
// ]

// type B = Transform<C>

type D = [string]
// type E = D[0]
// type F = 

interface Arr<T> {
    [index: number]: D[index]
}