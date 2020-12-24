// let Screen = function(DrawType,Argument){	//绘制函数
// 	let graph = DrawType(Argument);
// 	return graph;
// }

let DrawDots = function(centerPoint,size,color){		//画点	若无color请用''或""
	[two,g] = createTwo();		
	let index = 0;
	let circle = new Array();
	for(index = 0;centerPoint[index] != undefined;index++)
	{
		circle[index] = two.makeCircle(centerPoint[index][0],centerPoint[index][1],size[index]);
		circle[index].fill = color[index];
		circle[index].noStroke();
	}
	two.update();
	return circle;
}

let DrawLine = function(startPoint,endPoint,color,font){		//画线	
	//Argument = [[startPoint,endPoint],color,font]
	[two,g] = createTwo();
	let line = two.makeLine(startPoint[0],startPoint[1],endPoint[0],endPoint[1]);
	line.stroke = color;
	line.linewidth = font;
	two.update();
	return line; 
}

let DrawLines = function(xy,color,font){		//画多条线
	//Argument = [[xy],color,font]		若无color或width请用''或""
	[two,g] = createTwo();
	let index = 0;
	let line = new Array();
	for(index = 0;xy[index]!=undefined;index++)
	{
		line[index] = two.makeLine(xy[index][0],xy[index][1],xy[index][2],xy[index][3]);
		line[index].stroke = color[index];
		line[index].linewidth = font[index];
	}
	two.update();
	return line;
}

let LineStipple = function(x,y,length,interval,color,font){		//画虚线
	//Argument = [[x,y,length],interval,color,font]
	[two,g] = createTwo();
	let n = Math.round(0.5*length/interval);
	let stipple = new Array();
	let index = 0;
	for(index = 0;index < n;index++)
	{
		let x1 = x+interval*2*index
		let x2 = x+interval*(2*index+1)
		stipple[index] = two.makeLine(x1,y,x2,y);
		stipple[index].stroke = color;
		stipple[index].linewidth = font;
	}
	two.update();
	return stipple;
}

let DrawArc = function(ox,oy,r,sa,ea,font,color){			//画弧
	//Argument = [ox,oy,r,sa,ea,font,color]		r为外径
	[two,g] = createTwo();
	let ir = r - font;
	let arc = two.makeArcSegment(ox,oy,ir,r,sa,ea);
	arc.fill = color;
	arc.stroke = color;
	two.update();
	return arc;
}

let FillArc = function(ox,oy,r,sa,ea,color){			//画扇形
	//Argument = [ox,oy,r,sa,ea,color]
	[two,g] = createTwo();
	let arc = two.makeArcSegment(ox,oy,0,r,sa,ea);
	arc.fill = color;
	arc.stroke = color;
	two.update();
	return arc;
}

let FillRect = function(center_x,center_y,width,height,color){			//画实心矩形
	//Argument = [rect,color]
	let rect = FrameRect(center_x,center_y,width,height);
	rect.fill = color;
	two.update();
	return rect;
}

let FrameRect = function(center_x,center_y,width,height){			//画空心矩形
	//Argument = [center_x,center_y,width,height]
	[two,g] = createTwo();
	let newRect = two.makeRectangle(center_x,center_y,width,height);
	two.update();
	return newRect;
}

let FillOval = function(x,y,width,height,color0,color1){			//画椭圆
	//Argument = [ellipse,color]
	let ellipse = FrameOval(x,y,width,height,color0);
	ellipse.fill = color1;
	two.update();
	return ellipse;
}

let FrameOval = function(x,y,width,height,color){			//画空心椭圆
	//Argument = [[x,y,width,height],color]
	[two,g] = createTwo();
	let ellipse = two.makeEllipse(x,y,width,height);
	ellipse.stroke = color;
	two.update();
	return ellipse;
}

let FrameTrangle = function(x0,y0,x1,y1,x2,y2){		//空心三角形
	//Argument = [xy]	xy为三角形坐标点
	[two,g] = createTwo();
	let line = new Array();
	line[0] = two.makeLine(x0,y0,x1,y1);
	line[1] = two.makeLine(x0,y0,x2,y2);
	line[2] = two.makeLine(x2,y2,x1,y1);
	let trangle = two.makeGroup(line);
	two.update();
	return trangle;
}

let FrameStar = function(ox,oy,or,ir,sides){			//星型
	//Argument = [[ox,oy],or,ir,sides]
	[two,g] = createTwo();
	let star = two.makeStar(ox,oy,or,ir,sides);
	two.update();
	return star;
}

let FramePoly = function(ox,oy,r,sides){			//画正多边形
	//Argument = [[ox,oy],r,sides]
	[two,g] = createTwo();
	let poly = two.makePolygon(ox,oy,r,sides);
	two.update();
	return poly;
}

let FillStar = function(ox,oy,or,ir,sides,color){			//填充星型
	//Argument = [frameStar,color]
	let star = FrameStar(ox,oy,or,ir,sides);
	star.fill = color;
	two.update();
	return star;
}

let FillPoly = function(ox,oy,r,sides,color){			//填充正多边形
	//Argument = [framePoly,color]
	let poly = FramePoly(ox,oy,r,sides);
	poly.fill = color;
	two.update();
	return poly;
}

let DrawText = function(string,x,y,color,size,weight,textFont){			//绘制文本
	//Argument = [string,[xy],[color,size,weight,textFont]]
	[two,g] = createTwo();
	let styles = {
		family: textFont,
		fill : color,
		size: size,
		leading: 50,
		weight: weight
	}
	let text = two.makeText(string,x,y,styles);
	two.update();
	return text;
}

let CatStr = function(str){				//字符拼接
	let index = 0;
	let length = str.length;
	let newstr = '';
	for(index=0;index<length;index++)
	{
		newstr+=str[index];
	}
	return newstr;
}

let StrPad = function(str,number,str0){	//字符前填充
	let index = 0;
	let newstr = '';
	for(index=0;index<number;index++)
	{
		newstr+=str0;
	}
	newstr+=str;
	return newstr;
}

let Streq = function(str0,str1){	//字符串比较
	if(str0 === str1)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

let Replace = function(str,str0,str1){	//字符替换
	let newstr = str.replace(str0,str1);
	return newstr;
}

let Circle = function(x,y,r,color){			//画圆
	//Argument = [[x,y,r],color]
	[two,g] = createTwo();
	let circle = two.makeCircle(x,y,r);
	circle.stroke = color;
	two.update();
	return circle;
}

let Ellipse = function(x,y,width,height,color){			//画椭圆
	//Argument = [[x,y,width,height],color]
	[two,g] = createTwo();
	let ellipse = two.makeEllipse(x,y,width,height);
	ellipse.stroke =color;
	two.update();
	return ellipse;
}

let drawCircle = function(id,x,y,width,height) {
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

let createGratTwo = function(width,height){ 		
	let g = document.createElement("div");
	let params = {
		width:width,
		height:height,
		type:Two.Types.canvas
	}
	let two = new Two(params).appendTo(g);
	document.body.appendChild(g);
	return [two,g];
}

let Grat = function(x,y,width,height,r){		//创建光栅
	let rect = new Array();
	[two,g] = createGratTwo(width,height);
	drawCircle(g,x,y,width,height);

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