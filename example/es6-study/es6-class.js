class Animal{
    constructor(name) {
        this.name = name
        this.age = 1
    }
    static getType() {
        return 'animal'
    }
    say() {
        return this.name
    }
}