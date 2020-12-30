function after(times, callback) {
    let total = 0;
    return function(a) {
        total+=a
        if(--times == 0) {
            callback(total)
        }
    }
}
let fn = after(3, function(total) {
    console.log('after', total)
})

fn(1)
fn(2)
fn(3)