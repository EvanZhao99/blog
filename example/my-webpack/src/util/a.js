@subscriber('assistant_up_message', 'show')
class ModelComponent{
    show() {
        // todo
    }
}
function subscriber(messageName, functionName) {
    return target => {
        console.log(messageName, functionName);
    }
}