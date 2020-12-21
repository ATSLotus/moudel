function Mat(__row, __col, __data, __buffer){
    this.row = __row || 0;
    this.col = __col || 0;
    this.channel = 4;
    this.buffer = __buffer || new ArrayBuffer(__row * __col * 4);
    this.data = new Uint8ClampedArray(this.buffer);
    __data && this.data.set(__data);
    this.bytes = 1;
    this.type = "CV_RGBA";
}
function imread(__image){
    let width = __image.width,
        height = __image.height;
    iResize(width, height);
    iCtx.drawImage(__image, 0, 0);
    let imageData = iCtx.getImageData(0, 0, width, height),
        tempMat = new Mat(height, width, imageData.data);
    imageData = null;
    iCtx.clearRect(0, 0, width, height);
    return tempMat;
}
function iResize(__width, __height){
    iCanvas.width = __width;
    iCanvas.height = __height;
}
function RGBA2ImageData(__imgMat){
    let width = __imgMat.col,
        height = __imgMat.row,
        imageData = iCtx.createImageData(width, height);
    imageData.data.set(__imgMat.data);
    return imageData;
}

let iCanvas = document.createElement("canvas"),
iCtx = iCanvas.getContext("2d");
document.body.appendChild(iCanvas);
let img = new Image();
img.onload = function(){
    let myMat = imread(img);
    let imgData = RGBA2ImageData(myMat);
    console.log(myMat);
    iCtx.putImageData(imgData,0,0);
};
img.src = "./OIP1.png";
