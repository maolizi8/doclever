/**
 * 添加testproj
 */
var list=require("./list/store");
var test=require("./test/store");



var store=new Vuex.Store({
    namespaced:true,
    state:{
        testid:null,
		type:0,	//0-project list, 1-project detail
        islist:0,
		
        init:false,
        event:new Vue(),
        objCopyJSON:null
    },
    getters:{
        //geqiuli add
        
    },
    mutations:{
        setObjCopyJSON:function (state,data) {
            state.objCopyJSON=data;
        },
        setTestid:function (state,data) {
            console.log("setTestid-data")
            console.log(data)
            state.testid=data
        }
    },
    actions:{
        init:function (context) {
            context.state.testid=getUrlParam("testid");
			console.log('testproj>store.js>actions>init-testid')
            console.log(context.state.testid)
            if (context.state.testid) {
                context.state.type=1;
                context.state.islist=1;
				
                return Promise.all([
					context.dispatch("test/init")
                ]).then(function () {
                    context.state.init=true;
                })
            } else {
				context.state.type=0;
                context.state.islist=0;
				
                return Promise.all([
                    context.dispatch("list/init")
                ]).then(function () {
                    context.state.init=true;
                })
            }
            
        }
    },
    modules:{
        test:test,
        list:list
    }
})

module.exports=store;

if (module.hot) {
    module.hot.accept(['./list/store','./test/store'], function () {
        var list = require('./list/store')
        var test = require('./test/store')

        store.hotUpdate({
            modules: {
                list:list,
                test:test
            }
        })
    })
}
