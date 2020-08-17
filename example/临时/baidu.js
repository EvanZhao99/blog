let fontSize = 12
    function bigger(){
        let baiduArr = document.getElementsByClassName('title1');
        console.log(baiduArr);
        let baidu = baiduArr[1];
        fontSize ++;

        baidu.style.fontSize = fontSize + 'px'
    }