let KbInit = function(){
    let listener = new window.keypress.Listener();
    return listener;
}

let KbWait = function(arg,fun,forWhat){
    let listener = KbInit();
    let my_scope = this;
    let my_combos = listener.register_many([
        {
            "keys"          : arg,
            "is_exclusive"  : true,
            "on_keydown"    : function() {
                if(forWhat === 0||forWhat == undefined)
                {
                    fun();
                }
            },
            "on_keyup"      : function() {
                if(forWhat)
                {
                    fun();
                }
            },
            "this"          : my_scope
        }
    ]);
}

let ListenChar = function(arr,fun){
    let listener = KbInit();
    listener.sequence_combo(arr, function() {
        lives = 30;
        fun();
    },true);
}



let GetClick = function(e){
    e = e || window.event;
    if(e.pageX || e.pageY)
    {
        x=e.pageX;
        y=e.pageY;
    }   
    Click(range,fun);     
} 

let Click = function(range,fun){   
    //range = [xl,xr,yb,yt]
    console.dir(x+' '+y);
    if((x>=range[0]&&x<=range[1])&&(y>=range[2]&&y<=range[3]))
    {
        fun();
    }
}

let GetClicks = function(){
    document.onmousedown=GetClick;
}
