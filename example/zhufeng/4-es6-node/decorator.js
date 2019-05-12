class Animal {
    aa = 1;

    @readOnly
    eat() {
        console.log('吃饭')
    }
}

function readOnly(prototype, property, descriptor) {
    console.log(prototype == Animal.prototype, property, descriptor)
}