
//module.exports={}

var store=new Vuex.Store({
    
    state:{
        // pollList:[],
        // collectionOfTest:[],
        // type:0,	//0-list, 1-detail info
        // pollid:"",
        // islist:0,
        // pollRunList:[],
        // pollRunTotal:0,

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
				
                // return net.post("/poll/runlist",{
                //     poll:context.state.pollid,
                //     page:0
                // }).then(function (data) {
                    
                //     if(data.code==200)
                //     {
                //         context.state.pollRunList=data.data;
                //     }
                //     else
                //     {
                //         $.notify(data.msg,0)
                //     }
                // })

                Promise.all([
                    net.get("/poll/runlistcount",{
                            poll:context.state.pollid
                            }),
                    net.post("/poll/runlist",{
                            poll:context.state.pollid,
                            page:0
                        })
                ]).then(function (result) {
                    var obj1=result[0];
                    var obj2=result[1];
                    if(obj1.code==200)
                    {
                        context.state.pollRunTotal=obj1.data
                    }
                    else
                    {
                        throw obj1.msg;
                    }
                    if(obj2.code==200)
                    {
                        context.state.pollRunList=obj2.data;
                    }
                    else
                    {
                        throw obj2.msg;
                    }
                    //$.stopLoading();
                }).catch(function (err) {
                    $.stopLoading();
                    $.stopHud();
                    $.notify(err,0);
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

            
        },
        pollRunHistoryList:function (context,query) {
            return net.post("/poll/runlist",{
                poll:context.state.pollid,
                page:query.page
            }).then(function (data) {
                
                if(data.code==200)
                {
                    context.state.pollRunList=data.data;
                }
                else
                {
                    $.notify(data.msg,0)
                }
                return data;
            })
        },
        
    },
    modules:{
        
    }
})
    


module.exports=store;
