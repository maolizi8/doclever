
// var info=require("./info/store.js")
var info=require("./info/store")

var store=new Vuex.Store({
    namespaced:true,
    state:{
		
        type:"info",
        //teamid:"",
        init:false,
        event:new Vue(),
		
        objCopyJSON:null
    },
    mutations:{
        
    },
    methods:{
       
    },
    actions:{
        init:function (context) {
            console.log('interface>strore.js')
            console.log(context.state)
            return context.dispatch("info/init");
            //return Promise.all([context.dispatch("info/init")]);
        },
        
    },
    modules:{
        info:info
    },
})
    


module.exports=store;

if (module.hot) {
    module.hot.accept(['./info/store'], function () {
        var info = require('./info/store')

        store.hotUpdate({
            modules: {
                info:info
            }
        })
    })
}
