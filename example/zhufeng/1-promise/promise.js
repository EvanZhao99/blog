class Promise{
    constructor(executor) {
        this.status = 'pending';
        this.value
        this.reason;
        // 数组哪来的-------------???
        this.resolveCallbacks = [] // 当then是pending时 我希望把成功的方法都放到数组当中
        this.rejectCallbacks = []
        let resolve = (vlaue) => {
            // 如果是promise就调用这个promise的then方法
            if(value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if(this.status == 'pending') { // 保证状态只改变一次
                this.status = 'fulfilled'
                this.value = value
                this.resolveCallbacks.forEach(fn => fn()) // 发布
            }
        }
        let reject = (reason) => { // 保证状态只改变一次
            if(this.status === 'pending') {
                this.status = 'rejected'
                this.reason = reason
                this.rejectCallbacks.forEach(fn => fn())
            }

        }
        // 立即执行函数为外部提供 使用try-catch比较稳妥
        try{
            executor(resolve, reject)
        } catch(e) {
            reject(e)
        }
    }
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value;
        onrejected = typeof onrejected === 'function' ? onrejected : reason => {throw reason};
        // 创建一个新的promise
        let promise2;
        promise2 = new Promise((resolve, reject) => {
            if(this.status === 'fulfilled') {
                setTimeout(() => {
                    try{
                        let x = onfulfilled(this.value);
                        // x是普通值还是promise 如果是普通值 直接调用promise2的resolve
                        // 如果是promise 那应该让x这个promise执行x.then
                        resolveProise(promise2, x, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                },0)
            }
            if(this.status === 'rejected') {
                setTimeout(() => {
                    try{
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(e) {
                        reject(e)
                    }
                })
            }
            if(this.status == 'pending') {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
}