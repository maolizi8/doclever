
//module.exports={}

var store=new Vuex.Store({
    
    state:{
        pollList:[],
        collectionOfTest:[],
        type:0,	//0-list, 1-detail info
        pollid:"",
        islist:0,
        pollRunList:[],

        init:false,
        event:new Vue(),
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        init:function (context) {
            context.state.pollid=getUrlParam("pollid");
            
            if (context.state.pollid) {
                context.state.type=1;
                context.state.islist=1;
				
                return net.post("/poll/runlist",{
                    poll:context.state.pollid
                }).then(function (data) {
                    
                    if(data.code==200)
                    {
                        context.state.pollRunList=data.data;
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            } else {
				context.state.type=0;
                context.state.islist=0;
				
                return net.get("/poll/list",{}).then(function (data) {
                    if(data.code==200)
                    {
                        context.state.pollList=data.data;
                    }else
                    {
                        $.notify(data.msg,0)
                    }
                    //context.state.event.$emit("init");
                    return data;
                })
            }

            
        }
        
    },
    modules:{
        
    }
})
    


module.exports=store;
