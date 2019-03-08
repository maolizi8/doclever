var list=require("./list/store.js")
//var info=require("./info/store.js")
//module.exports={}

var store=new Vuex.Store({
    namespaced:true,
    state:{
        type:"list",
        init:false,
        event:new Vue(),
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        init:function (context) {
            return Promise.all([context.dispatch("list/init")]);
        },
        changeToList:function (context) {
            session.remove("teamId");
            session.remove("teamName");
            context.state.type="list";
            context.dispatch("project/changeToList",null,{
                root:true
            });
        },
        changeToInfo:function (context,obj) {
            session.set("teamId",obj.id);
            session.set("teamName",obj.name);
            context.state.type="info";
            context.dispatch("project/changeToList",null,{
                root:true
            });
        }
    },
    modules:{
        list:list
        //,info:info
    }
})
    


module.exports=store;
if (module.hot) {
    module.hot.accept(['./list/store'], function () {
        var list = require('./list/store')
        //var info = require('./info/store')

        store.hotUpdate({
            modules: {
                list:list
                //,info:info
            }
        })
    })
}
