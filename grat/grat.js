function drawCircle(id,x,y,width,height) {
    let svg = id;
    svg.style.border = '0px';
    svg.style.width = width + 'px';
    svg.style.height = height + 'px';
    svg.style.marginLeft = x + 'px';
    svg.style.marginTop = y + 'px';
    svg.style.borderRadius = '50%';
    svg.style.position = 'absolute';
    svg.style.overflow = 'hidden';
}

function drawGrating(two,id,x,y,width,height,r){
	let rect = new Array();

	drawCircle(id,x,y,width,height);

    var R="FF";
    var G="FF";
    var B="FF";

    for(var i=0;i < 4*height;i++){
        var k = 128+127*Math.cos(i/64*2*Math.PI+Math.PI/4);
        var t = Math.round(k);
        var z = t.toString(16);
        if(t<16){
            z="0"+z;
        }
        R=G=B=String(z);
        rect[i] = two.makeRectangle(0,i-two.height/2,width,1);
        rect[i].fill = "#"+R+G+B;
        rect[i].stroke = "#"+R+G+B;
    }
    let group = two.makeGroup(rect);
    group.translation.set(two.width/2,two.height/2);
    group.rotation = r;
    two.update(); 
    return group;
}
