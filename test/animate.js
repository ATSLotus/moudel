var delay_frame = num1=> {
    let time_num=0;     
    return new Promise(function (resolve, reject) {
        (function raf(){
            time_num++;
            let id =window.requestAnimationFrame(raf);
        if( time_num==num1){
            window.cancelAnimationFrame(id);
            resolve(0);
        }
    }())
})};

let translation = function(two,id,w,tf,tf_d,k,v){
	//console.dir(id);
	let g = two.makeGroup(id);
	//g.translation.set(w,0);
	g.translation.set(k,0)
    if(k < w && v > 0)
    {
        k += v;
        v-=tf_d;
    }
    else
    {
        k = 0;
        v = tf;
    }
    return [k,v];
	two.update();
}

let sport = function(two,id,w,tf){
	console.dir(w);
	if (w == undefined) 
	{
		w = 200;
	}
	if(tf == undefined)
	{
		tf = 10;
	}
	let k = 0;
	let v = tf;
	let tf_d = v*v/(2*w);
	(async function(){
        do{
        	[k,v] = translation(two,id,w,tf,tf_d,k,v);
            await delay_frame(3);
        	two.update();
        }while(1)
    }())
}