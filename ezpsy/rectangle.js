let createTwo = function(){ 
	let g = document.createElement("div");
	let params = {
		fullscreen:true,
		type:Two.Types.canvas
	}
	let two = new Two(params).appendTo(g);
	document.body.appendChild(g);
	return [two,g];
}

let RectCoordinate = function(rect){				//获取矩形参数
	let [x,y] = RectCenterd(rect);
	let [w,h] = RectSize(rect);
	let newRect = [x,y];
	newRect.push.apply(newRect,[w,h]);
	return newRect;
}

let SetRect = function(center_x,center_y,width,height){	//创建矩形
	[two,g] = createTwo();
	let newRect = two.makeRectangle(center_x,center_y,width,height);
	two.update();
	return newRect;
}

let RectCenterd = function(rect){		//获取矩形中心位置
	x = rect.translation.x;
	y = rect.translation.y;
	return [x,y];
}

let RectHeight = function(rect){		//获取矩形高度
	height = rect.height;	
	return height;
}

let RectWidth = function(rect){			//获取矩形宽度
	width = rect.width;
	return width;
}

let RectSize = function(rect){			//获取矩形宽高
	height = rect.height; 
	width = rect.width;
	return [width,height];
}

let AdjoinRect = function(rect,fixedRect,fixedSide){	//矩形拼接
	//	rect待拼接矩形	fixedRect基准矩形	fixedSide拼接位置
	let newRect = fixedSide(rect,fixedRect);
	return newRect;
}

let RectLeft = function(rect,fixedRect){		//左侧拼接
	[xfr,yfr] = RectCenterd(fixedRect);
	wr = RectWidth(rect);
	wfr = RectWidth(fixedRect);
	let newRect = RectCoordinate(rect);
	rect.translation.set(xfr-wfr/2-wr/2,yfr);
	two.update();
	return newRect;
}

let RectRight = function(rect,fixedRect){		//右侧拼接
	[xfr,yfr] = RectCenterd(fixedRect);
	wr = RectWidth(rect);
	wfr = RectWidth(fixedRect);
	let newRect = RectCoordinate(rect);
	rect.translation.set(xfr+wfr/2+wr/2,yfr)
	two.update();
	return newRect;
}

let RectTop = function(rect,fixedRect){			//上侧拼接
	[xfr,yfr] = RectCenterd(fixedRect);
	hr = RectHeight(rect);
	hfr = RectHeight(fixedRect);
	let newRect = RectCoordinate(rect);
	rect.translation.set(xfr,yfr-hfr/2-hr/2);
	two.update();
	return newRect;
}

let RectBottom = function(rect,fixedRect){		//下侧拼接
	[xfr,yfr] = RectCenterd(fixedRect);
	hr = RectHeight(rect);
	hfr = RectHeight(fixedRect);
	let newRect = RectCoordinate(rect);
	rect.translation.set(xfr,yfr+hfr/2+hr/2);
	two.update();
	return newRect;
}

let Rect = function(rect,side){						//获取矩形左右顶底边坐标
	[x,y] = RectCenterd(rect);
	[w,h] = RectSize(rect);
	let xLeft = x-w/2;
	let xRight = x+w/2;
	let yTop = y-h/2;
	let yBottom = y+h/2;
	if(side === RectLeft)
	{
		return xLeft;
	}
	else if(side === RectRight)
	{
		return xRight;
	}
	else if(side === RectTop)
	{
		return yTop;
	}
	else
	{
		return yBottom;
	}
}

let AlignRect = function(rect,fixedRect,side1,side2){	//矩形对齐
	let newRect = RectCoordinate(rect);
	let x,y;
	if(side2 == undefined)
	{
		side2 = 4;
		if(side1 == undefined)
		{
			side1 = 4;
		}
	}
	else{
		side1 = CToN(side1);
		side2 = CToN(side2);
		console.dir(side1+','+side2);
		if(side1 === side2)
		{
			if(side1 !== 4)
			{
				console.dir("error");
				return newRect;
			}
		}
		else 		
		{
			if(side1 > side2)
			{
				let t;
				t = side1;
				side1 = side2;
				side2 = t;
			}
			if(side1 !== 4 && side2 !== 4)
			{
				if((side1-side2)%2 === 0)
				{
					side1 = side2 = 4;
				}	
			}
			
		}
	}
	[x,y] = Align(rect,fixedRect,side1,x,y);
	[x,y] = Align(rect,fixedRect,side2,x,y);
	rect.translation.set(x,y);
	two.update();
	return newRect;
}

let CToN = function(side){
	s = ['left','top','right','bottom','center'];		//0-4分别表示左上右下
	let index = 0;
	for(index=0;index<5;index++)
	{
		if(side === s[index] || side === index)
		{
			side = index;
			return side;
		}
	}
}

let Align = function(rect,fixedRect,side,x,y){		//获取对齐后的坐标
	[xfr,yfr] = RectCenterd(fixedRect);
	[wr,hr] = RectSize(rect);
	[wfr,hfr] = RectSize(fixedRect);
	if(side === 0)
	{
		x = xfr-wfr/2+wr/2;
	}
	else if(side === 1)
	{
		y = yfr-hfr/2+hr/2;
	}
	else if(side === 2)
	{
		x = xfr+wfr/2-wr/2;
	}
	else if(side === 3)
	{
		y = yfr+hfr/2-hr/2;
	}
	else if(side === 4)
	{
		if(x == undefined)
		{
			x = xfr;
		}
		else
		{
			y = yfr;
		}
	}
	else
	{
		console.dir("error");
	}
	return [x,y];
}

let ArrangeRects = function(Arrange,RectArgument){		//创建矩形阵列
	if(Arrange === undefined)
	{
		Arrange = [2,2];
	}
	else{
		if(Arrange.length < 2)
		{
			Arrange = [2,2];
		}
		else if(Arrange.length > 2)
		{
			console.dir('error');
			return 0;
		}	
	}
	if(RectArgument == undefined)
	{
		RectArgument = [100,100,50,50];
	}
	else if(RectArgument.length <= 4)
	{
		RectArgument = [100,100,50,50];
	}
	else if(RectArgument.length > 4)
	{
		console.dir('error');
		return 0;
	}
	let n = new Array();
	let index1,index2;
	let i = 0;
	let x = RectArgument[0];
	let y = RectArgument[1];
	let w = RectArgument[2];
	let h = RectArgument[3];
	for(index1=0;index1<Arrange[0];index1++)
	{
		for(index2=0;index2<Arrange[1];index2++)
		{
			SetRect(x+w*index1,y+h*index2,w,h);
			n[i] = [x+w*index1,y+h*index2];
			i++;
		}
	}
	n.push.apply(n,[w,h]);
	return n;
}

let CenterRect = function(rect,fixedRect){		//矩形居中至某矩形
	let newRect,dh,dv;			//dh,dv分别为水平方向偏移量和垂直方向偏移量
	[xr,yr] = RectCenterd(rect);
	newRect = AlignRect(rect,fixedRect);
	[xn,yn] = RectCenterd(newRect);
	dh = xn - xr;				//右偏为正
	dv = yn - yr;				//下偏为正
	return [newRect,dh,dv];
}

let CenterRectOnPoint = function(rect,x,y){		//矩形居中至某点
	rect.translation.set(x,y);
	two.update();
	let newRect = RectCoordinate(rect);
	return newRect;
}

let ClipRect = function(rect0,rect1){			//矩形重叠区域
	let [x0,y0] = RectCenterd(rect0);	
	let [x1,y1] = RectCenterd(rect1);
	let [w0,h0] = RectSize(rect0);
	let [w1,h1] = RectSize(rect1);
	let w = (w0+w1)/2;
	let h = (h0+h1)/2;
	let x = Math.abs(x1-x0);
	let y = Math.abs(y1-y0);
	let newRect,xn,yn,wn,hn;
	if(x>w||y>h)
	{
		newRect = [0,0,0,0];
	}
	else
	{
		wn = w - x;
		hn = h - y;
		xn = x0+w0/2-wn/2;
		yn = y0+h0/2-hn/2;
		newRect = [xn,yn,wn,hn];
	}
	return newRect;
}

let ScaleRect = function(RectArgument,multiple){		//矩形缩放
	let index = 0;
	let length = RectArgument.length;
	let length0 = RectArgument.length/4;
	let length1 = multiple.length;
	let newr;
	if(length0 === length1)
	{
		for(index=2;index<length;index++)
		{
			if(index%2===0)
			{
				if(index%4===0)	
				{
					index += 2;
				}
				RectArgument[index] *= multiple[0];
			}
			else
			{
				RectArgument[index] *= multiple[1];
			}
		}
	}
	else
	{
		console.dir('error');
		return 0;
	}
	newr = RectArgument;
	return newr;
}

let IsEmptyRext = function(RectArgument){			//判断矩形是否为空
	let S = RectArgument[2]*RectArgument[3];
	if(S === 0)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

let IsInRect = function(x,y,rect){					//某点是否在矩形内
	[c_x,c_y] = RectCenterd(rect);
	[w,h] = RectSize(rect);
	let fx,fy;
	if(x>=c_x-w/2&&x<=c_x+w/2)
	{
		fx = 1;
	}
	else
	{
		fx = 0;
	}
	if(y>=c_y-h/2&&y<=c_y+h/2)
	{
		fy = 1;
	}
	else
	{
		fy = 0;
	}
	return fx&&fy;
}

let OffsetRect = function(oldRect,x,y){			//矩形平移
	[c_x,c_y] = RectCenterd(oldRect);
	oldRect.translation.set(c_x+x,c_y+y);
	two.update();
	let newRect = RectCoordinate(oldRect);
	return newRect;
}

let RectOfMarix = function(mat){				//获取矩阵边界矩形
	let length = mat.length - 2;
	let mo = mat[0];
	let ml = mat[length-1];
	let mw = mat[length];
	let mh = mat[length+1]
	let newRect;
	let x = (ml[0]+mo[0])/2;
	let y = (ml[1]+mo[1])/2;
	let w = ml[0]-mo[0]+mw;
	let h = ml[1]-mo[1]+mh;
	newRect = [x,y,w,h];
	return newRect;
}