
var sessionChange=require("common/mixins/session");
var mainheader=require("component/mainHeader.vue");

var store=require("./store");
var list=require("./component/pollList.vue");
var info=require("./component/runList.vue");


var vue=new Vue({
    el:"#app",
    data:{
        menu:"testpoll"
    },
    mixins:[sessionChange],
    directives:{
        //proxy:proxyImg
    },
    components:{
        "mainheader":mainheader,
        
        "list":list,
        "info":info
    },
    store:store,
    watch:{
        
    },
    computed:{
        type:function(){
			return store.state.type;
        },
        islist:function(){
            // console.log("testpoll.js>islist");
            // console.log(store.state.islist);
			return store.state.islist;
        },
    },
    methods:{
        
    },
    created:function () {
        window.hljs.initHighlightingOnLoad();
        var _this=this;
        store.dispatch("init").then(function () {
            $.stopLoading();
            
        }).catch(function (err) {
            $.stopLoading();
            $.notify(err,0);
        })
    }
});

// window.vueObj=vue;
// window.worker=new Worker('common/js/worker.js');

$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
    
}