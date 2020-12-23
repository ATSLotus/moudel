let Version = function(){       //获取浏览器版本
    let appName = navigator.appName;
    let appVersion = navigator.appVersion;
    /*Swal.fire({
        html:
        "<a id='appN'>appName:</a>"+appName+"</br>"+
        "<a id='appV'>appVersion:</a>"+appVersion
    })*/
    return [appName,appVersion];
}

let WinRect = function(){       //获取窗口尺寸
    let w = screen.width;
    let h = screen.height;
    return [w,h]
}

let PixelSize = function(){     //获取像素位数
    let pixel = screen.pixelDepth;
    return pixel;
}

