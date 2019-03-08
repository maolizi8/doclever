//var info=require("./info/store.js")
//module.exports={}

var store=new Vuex.Store({
    namespaced:true,
    state:{
        type:"interface",
        interfaceList:[],
        
        init:false,
        event:new Vue(),
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        init:function (context) {
            return net.get("/interface/interfacelist",{}).then(function (data) {
                console.log('dashboard>store.js>data')
                console.log(data)
                if(data.code==200)
                {
                    context.state.interfaceList=data.data;
                }else
                {
                    $.notify(data.msg,0)
                }
                return data;
            })
        },
        info:function (context,node) {
            return net.get("/interface/interfacelist",{}).then(function (data) {
                console.log('dashboard>store.js>data')
                console.log(data)
                if(data.code==200)
                {
                    context.state.interfaceList=data.data;
                }else
                {
                    $.notify(data.msg,0)
                }
                return data;
            })
        },
    },
    modules:{
        //list:list
    }
})


module.exports=store;