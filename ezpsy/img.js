let ctxInit = function(){           //初始化canvas
    let c=document.createElement("canvas");     
	let ctx=c.getContext("2d");
    document.body.appendChild(c);
    return [c,ctx];
}

let imgLoad = function(){           //加载图片
    [c,ctx] = ctxInit();
    c.width = 1000;
    c.height = 1000;
    img = new Image();
    img.src = 'OIP.png';
    img1 = new Image();
    img1.src = 'OIP1.png'
    window.onload = function(){
        let imgData = imRead(img);
        let imgx = SetImageAlpha(imgData,0.6);
        putImage(imgx,0,h);
    }
} 

let imRead = function(img){         //读取图片矩阵
    [w,h] = [img.width,img.height];
    ctx.drawImage(img,0,0);
    let imgData=ctx.getImageData(0,0,img.width,img.height);
    return imgData;
}

let UnpackColorImage = function(imgData){   //拆分图片RGB
    let R = new Array();
    let G = new Array();
    let B = new Array();
    let i = 0;
    let t = 0;
    for(i = 0;i < imgData.data.length;i+=4)
    {
        R[t] = imgData.data[0+i];
        G[t] = imgData.data[1+i];
        B[t] = imgData.data[2+i];
        t++;
    }
    return [R,G,B];
}

let PackColorImage = function(R,G,B){       //合并RGB
    let buffer = new Array();
    let i = 0;
    let t = 0;
    for(i = 0;i < R.length;i++)
    {
        buffer[t] = R[i];
        buffer[t+1] = G[i];
        buffer[t+2] = B[i];
        buffer[t+3] = 255;
        t += 4;
    }
    let output = new Uint8ClampedArray(buffer);
    return output;
}

let Uint8ToImgD = function(array){      //Uint8ClampedArray转ImageData
    let imgData = new ImageData(array,w,h);
    return imgData;
}

let putImage = function(imgData,width,height){      //以图片矩阵绘制图片
    if(imgData.__proto__.constructor.name !== 'ImageData')
    {
        imgData = Uint8ToImgD(imgData);
    }
    ctx.putImageData(imgData,width,height);
    return imgData;
}

let RGBToG = function(imgData){             //RGB转灰度
    let buffer = new Array();
    let [R,G,B] =  UnpackColorImage(imgData);
    let i = 0;
    let t = 0;
    for(i = 0;i < R.length;i++)
    {
        buffer[t] = 0.299*R[i] + 0.587*G[i] + 0.114*B[i];
        buffer[t+1] = buffer[t];
        buffer[t+2] = buffer[t];
        buffer[t+3] = 255;
        t += 4;
    }
    let Grey = new Uint8ClampedArray(buffer);
    return Grey;
}

let SetImageAlpha = function(imgData,alpha){        //设置透明度，alpha在(0,1];
    let i = 0;
    for(i = 0;i < imgData.data.length;i+=4)
    {
        imgData.data[i+3] = 255*alpha;
    }
    return imgData;
}
