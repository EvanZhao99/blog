
// let a = require('./util/a.js')
// console.log('hello world')
// @subscriber('assistant_up_message', 'show')
class ModelComponent{
    @subscribe('choice_question_message')
    close() {
        // todo
    }
}
function subscribe(messageName) {
    return target => {
        console.log(messageName);
    }
}