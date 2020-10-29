let drawRect = function(two,x,y,width,height,fillColor,borderColor){
	let rect = two.makeRectangle(x,y,width,height);
	rect.fill = fillColor;
	rect.stroke = borderColor;
	two.update();
	return rect;
}