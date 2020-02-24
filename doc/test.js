class Queue{
    constructor() {
        this.tasks= []
    }
    add(time,data) {
        setTimeout(() => {
            this.publish({time, data})
        }, new Date(time).getTime() - Date.now())
    }
    publish(task) {
        this.tasks.push(task)
    }
    listen() {
        setInterval(() => {
            let index = this.tasks.length -1
            while(index >= 0) {
                let task = this.tasks[index--]
                console.log(task.data, Date.now() - task.time)
            }
            this.tasks.length = 0
        }, 1000)
    }
}

console.log('start:', Date.now())
let queue = new Queue()
queue.add(Date.now() + 2398, 'hello world')
queue.listen()