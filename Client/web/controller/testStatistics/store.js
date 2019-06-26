
//module.exports={}

var store=new Vuex.Store({
    
    state:{
        pollList:[],
        
        islist:0,

        init:false,
        event:new Vue(),
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        init:function (context) {
            return net.get("/poll/list",{
                runEnvironment:0
            }).then(function (data) {
                console.log("testStatistics>store.js>init");
                if(data.code==200)
                {
                    context.state.pollList=data.data
                    console.log("testStatistics>store.js>>context.state.pollList")
                    console.log(context.state.pollList)
                }
                else
                {
                    $.notify(data.msg,0)
                }
                //$.stopLoading();
            }).catch(function (err) {
                $.stopLoading();
                $.stopHud();
                $.notify(err,0);
            })
            
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
