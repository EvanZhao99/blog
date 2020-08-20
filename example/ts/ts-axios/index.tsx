class Model {
    constructor() {
        this.name = '';
    }
    name: string;
    show() {

    };
}
let m = new Model();
function ui() {
    let name = m.name;
    return (
        <div ></div>
    )
}