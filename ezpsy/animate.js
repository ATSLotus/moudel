let delay_frame = num1=> {
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

function translation(two,g,width,height,w,tf,frameA,r){
        g.translation.set(w,tf);
                
        if(r%1!=0){
            if (0<r && r<=Math.PI/2) 
            {
                if(tf > -height/2*Math.cos(r) && w < 3*width*Math.sin(r))
                {
                    tf -= frameA * Math.cos(r);
                    w += frameA * Math.sin(r);
                }
            else
            {
                tf = two.height/2;
                w = two.width/2;
            }
        }
        else if(Math.PI/2<r && r<=Math.PI)
        {
            if(tf > height/2*Math.cos(r) && w > -width*Math.sin(r))
            {
                tf -= frameA * Math.cos(r);
                w += frameA * Math.sin(r);
            }
            else
            {
                tf = two.height/2;
                w = two.width/2;
            }
        }
        else if(Math.PI<r && r<=3*Math.PI/2)
            {
                if(tf > height/2*Math.cos(r) && w > width*Math.sin(r))
                {
                    tf -= frameA * Math.cos(r);
                    w += frameA * Math.sin(r);
                }
                else
                {
                    tf = two.height/2;
                    w = two.width/2;
                }
            }
            else if(3*Math.PI/2<r && r<=2*Math.PI)
            {
                if(tf > -3/2*height*Math.cos(r) && w > width*Math.sin(r))
                {
                    tf -= frameA * Math.cos(r);
                    w += frameA * Math.sin(r);
                }
                else
                {
                    tf = two.height/2;
                    w = two.width/2;
                }
            }
            else
            {
                r -= 2*Math.PI;
            }
        }
        else
        {
            if(r==0){
                if(tf > -height/2*Math.cos(r) && w > width*Math.sin(r))
                {
                    tf -= frameA * Math.cos(r);
                    w += frameA * Math.sin(r);
                }
                else
                {
                    tf = two.height/2;
                    w = two.width/2;
                }
            }
            r = r/180*Math.PI;
        }     
        return [w,tf];                   
    }

let sport = function(two,g,width,height,frameA,r){
    let w = two.width/2;
    let tf = two.height/2;
    if(frameA == undefined)
    {
        frameA = 4;
    }
    if(r == undefined)
    {
        r = 0;
    }
    two.bind('update',(frameCount)=>{
        [w,tf] = translation(two,g,width,height,w,tf,frameA,r)
    }).play();
}