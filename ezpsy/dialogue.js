let dlg = function(title,input){        //输入对话参数结构体
    this.title = title;     
    this.input = input;
}

let inputdlg = function(title,type){        //输入对话框
    let array = Array();
    for(let i = 0;i<title.length;i++)
    {
        array[i] = new dlg(title[i],type[i]);
    }
    Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
    }).queue(array).then((result)=>{
        res = result.value;
    })
}

let errordlg = function(errorstring,dlgname){       //错误对话框
    if(!errorstring)
    {
        errorstring = '您的操作出现错误';
    }
    if(!dlgname)
    {
        dlgname = '错误提示';
    }
    Swal.fire({
        titleText:dlgname,
        text:errorstring,
        type:'error'
    })
}

let helpdlg = function(helpstring,dlgname){     //帮助对话框
    if(!helpstring)
    {
        helpstring = '这是一个帮助对话框';
    }
    if(!dlgname)
    {
        dlgname = '帮助对话框';
    } 
    Swal.fire({
        titleText:dlgname,
        text:helpstring,
        type:"warning"
    })
}

let listdlg = function(liststring,promptstring,dlgname){    //列表选择对话框
    if(!promptstring)
    {
        promptstring = '请选择所需内容';
    }
    if(!dlgname)
    {
        dlgname = '选择对话框'
    }
    Swal.fire({
        title:dlgname,
        text:promptstring,
        input:'select',
        inputOptions:liststring,
        inputPlaceholder:promptstring,
        showCancelButton:true
    }).then((result)=>{
        if(result.dismiss === 'cancel')
        {
            ok = 0;
            s = [];
        }
        else
        {
            ok = 1;
            s = result.value;
        }
    })
}

let msgbox = function(Message,Title,Icon,IconMode){//信息对话框
    if(!Message)
    {
        Message = '信息对话'
    }
    if(!Title)
    {
        Title = '信息对话框'
    }
    if(!Icon)
    {
        Icon = 'warning'
    }
    if(!IconMode)
    {
        Swal.fire({
            title:Title,
            text:Message,
            type:Icon
        })
    }
    else
    {
        Swal.fire({
            title:Title,
            text:Message,
            imageUrl:Icon,
            imageWidth:120+'px',
            imggeHeight:120+'px'
        })
    }
}

let questdlg = function(qststing,title,str){        //询问对话框
    if(!qststing)
    {
        qststing='询问对话'
    }
    if(!title)
    {
        title='询问对话框'
    }
    if(!str)
    {
        str='确认执行本次操作？'
    }
    Swal.fire({
        title:title,
        text:qststing,
        showCancelButton:true,
        type:'question',
        confirmButtonText:'确认',
        cancelButtonText:'取消'
    }).then((result)=>{
        if(result.value)
        {
            Swal.fire({
                text:str,
                showCancelButton:true,
                type:'question',
                confirmButtonText:'是',
                cancelButtonText:'否'
            }).then((result)=>{
                if(result.dismiss === 'cancel')
                {
                    questdlg(qststing,title,str,option);
                }
                else
                {
                    Swal.fire({
                        type:'success',
                        text:'操作成功'
                    })
                }
            })
        }
        else
        {
            Swal.fire('已取消本次操作');
        }   
    })
}

let warndlg = function(warnstring,dlgname){     //警告对话框
    if(!warnstring)
    {
        warnstring = '这是一个帮助对话框';
    }
    if(!dlgname)
    {
        dlgname = '帮助对话框';
    } 
    Swal.fire({
        title:dlgname,
        text:warnstring,
        type:'warning'
    })
}

let uigetfile = function(){     //文件选择
    (async function(){
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*'+'txt/*',
                'aria-label': 'Upload your profile picture'
            }
        })
        /*let arr = file.type;
        arr = arr.slice(0,5);
        console.dir(arr);*/
        if(file){
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                title: 'Your uploaded picture',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture'
                })
            }
            reader.readAsDataURL(file)
        }
    }())
}

