function swap(arr, x, y) {
    let z = arr[x]
    arr[x] = arr[y]
    arr[y] = z
}
function partition(arr, start, end) {
    let pivot = arr[end-1]
    let i = start
    for (let j = start; j < end; j++) {
        // 将比pivot小的放到前面
        if (arr[j] < pivot) {
            swap(arr, i++, j)
        }
    }
    swap(arr, i, end-1)
    // console.log(i)
    return i
}
function quickSort(arr, start=0, end=arr.length) {
  console.log(arr, start, end)
    if (end - start <= 1) {
        return
    }
    let p = partition(arr, start, end)
    // 左开右闭
    quickSort(arr, start, p)
    quickSort(arr, p+1, end)
}

let arr = [1,5,8,3,2,9, 7]
quickSort(arr)
// partition(arr, 0,  arr.length)
console.log(arr)