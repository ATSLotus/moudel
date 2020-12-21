let Screen = function(DrawType,Argument){	//绘制函数
	let graph = DrawType(Argument);
	return graph;
}

let DrawDots = function(Argument){		//画点	若无color请用''或""
	//Argument = [centerPoint,size,color]		
	let index = 0;
	let circle = new Array();
	for(index = 0;Argument[4*index] != undefined;index++)
	{
		circle[index] = two.makeCircle(Argument[4*index],Argument[1+4*index],Argument[2+4*index]);
		circle[index].fill = Argument[3+4*index];
		circle[index].noStroke();
	}
	two.update();
	return circle;
}

let DrawLine = function(Argument){		//画线	
	//Argument = [[startPoint,endPoint],color,font]
	let xy = Argument[0]
	let line = two.makeLine(xy[0],xy[1],xy[2],xy[3]);
	line.stroke = Argument[1];
	line.linewidth = Argument[2];
	two.update();
	return line; 
}

let DrawLines = function(Argument){		//画多条线
	//Argument = [[xy],color,font]		若无color或width请用''或""
	let index = 0;
	let line = new Array();
	for(index = 0;Argument[3*index]!=undefined;index++)
	{
		let xy = Argument[3*index];
		line[index] = two.makeLine(xy[0],xy[1],xy[2],xy[3]);
		line[index].stroke = Argument[1+3*index];
		line[index].linewidth = Argument[2+3*index];
	}
	two.update();
	return line;
}

let LineStipple = function(Argument){		//画虚线
	//Argument = [[x,y,length],interval,color,font]
	let xy = Argument[0];
	let n = Math.round(0.5*xy[2]/Argument[1]);
	let stipple = new Array();
	let index = 0;
	for(index = 0;index < n;index++)
	{
		let x1 = xy[0]+Argument[1]*2*index
		let x2 = xy[0]+Argument[1]*(2*index+1)
		stipple[index] = two.makeLine(x1,xy[1],x2,xy[1]);
		stipple[index].stroke = Argument[2];
		stipple[index].linewidth = Argument[3];
	}
	console.dir(stipple);
	two.update();
	return stipple;
}

let DrawArc = function(Argument){			//画弧
	//Argument = [ox,oy,r,sa,ea,font,color]		r为外径
	let ir = Argument[2] - Argument[5];
	let arc = two.makeArcSegment(Argument[0],Argument[1],ir,Argument[2],Argument[3],Argument[4]);
	arc.fill = Argument[6];
	arc.stroke = Argument[6];
	two.update();
	return arc;
}

let FillArc = function(Argument){			//画扇形
	//Argument = [ox,oy,r,sa,ea,color]
	let arc = two.makeArcSegment(Argument[0],Argument[1],0,Argument[2],Argument[3],Argument[4]);
	arc.fill = Argument[5];
	arc.stroke = Argument[5];
	two.update();
	return arc;
}

let FillRect = function(Argument){			//画实心矩形
	//Argument = [rect,color]
	let rect = Argument[0];
	rect.fill = Argument[1];
	two.update();
	return rect;
}

let FrameRect = function(Argument){			//画空心矩形
	//Argument = [center_x,center_y,width,height]
	let rect = setRect(Argument[0],Argument[1],Argument[2],Argument[3])
	return rect;
}

let FillOval = function(Argument){			//画椭圆
	//Argument = [ellipse,color]
	let ellipse = Argument[0];
	ellipse.fill = Argument[1];
	two.update();
	return ellipse;
}

let FrameOval = function(Argument){			//画空心椭圆
	//Argument = [[x,y,width,height],color]
	let xy = Argument[0];
	let ellipse = two.makeEllipse(xy[0],xy[1],xy[2],xy[3]);
	ellipse.stroke = Argument[1];
	two.update();
	return ellipse;
}

let FrameTrangle = function(Argument){		//空心三角形
	//Argument = [xy]	xy为三角形坐标点
	let line = new Array();
	line[0] = two.makeLine(Argument[0],Argument[1],Argument[2],Argument[3]);
	line[1] = two.makeLine(Argument[0],Argument[1],Argument[4],Argument[5]);
	line[2] = two.makeLine(Argument[4],Argument[5],Argument[2],Argument[3]);
	two.update();
	return trangle;
}

let FrameStar = function(Argument){			//星型
	//Argument = [[ox,oy],or,ir,sides]
	let xy = Argument[0];
	let star = two.makeStar(xy[0],xy[1],Argument[1],Argument[2],Argument[3]);
	two.update();
	return star;
}

let FramePoly = function(Argument){			//画正多边形
	//Argument = [[ox,oy],r,sides]
	let xy = Argument[0];
	let poly = two.makePolygon(xy[0],xy[1],Argument[1],Argument[2]);
	two.update();
	return poly;
}

let FillStar = function(Argument){			//填充星型
	//Argument = [frameStar,color]
	let star = Argument[0];
	star.fill = Argument[1];
	two.update();
	return star;
}

let FillPoly = function(Argument){			//填充正多边形
	//Argument = [framePoly,color]
	let poly = Argument[0];
	poly.fill = Argument[1];
	two.update();
	return poly;
}

let DrawText = function(Argument){			//绘制文本
	//Argument = [string,[xy],[color,size,weight,textFont]]
	let xy = Argument[1]
	let sty = Argument[2];
	let styles = {
		family: sty[3],
		fill : sty[0],
		size: sty[1],
		leading: 50,
		weight: sty[2]
	}
	let text = two.makeText(Argument[0],xy[0],xy[1],styles);
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

let Circle = function(Argument){			//画圆
	//Argument = [[x,y,r],color]
	let xy = Argument[0];
	let circle = two.makeCircle(xy[0],xy[1],xy[2]);
	circle.stroke = Argument[1];
	two.update();
	return circle;
}

let Ellipse = function(Argument){			//画椭圆
	//Argument = [[x,y,width,height],color]
	let xy = Argument[0];
	let ellipse = two.makeEllipse(xy[0],xy[1],xy[2],xy[3]);
	ellipse.stroke = Argument[1];
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