
var proxyImg=require("common/director/proxyImg");
var sessionChange=require("common/mixins/session");
var mainheader=require("component/mainHeader.vue");


var leftmenu=require("component/leftMenu.vue");
var ver=require("../../../../ver.json");

var store=require("./store");
var list=require("./list/list.vue");
var test=require("./test/test.vue");
var userSession=require("component/userSession.vue");


var vue=new Vue({
    el:"#app",
    data:{
        menu:"test",
       
        // showTeam:false,
        // applyPending:false,
        // applyName:"",
        // applyDis:"",
        //proxy:session.get("proxy")?true:false,
    },
    mixins:[sessionChange],
    directives:{
        //proxy:proxyImg
    },
    components:{
		"mainheader":mainheader,
		
        "leftmenu":leftmenu,
        "list":list,
        "test":test,
        "userSession":userSession
    },
    store:store,
    watch:{
        proxy:function (val) {
            if(val)
            {
                session.set("proxy",1);
                $.tip("Proxy代理已开启",1)
            }
            else
            {
                session.remove("proxy");
                $.tip("Proxy代理已关闭",1)
            }
        }
    },
    computed:{
        type:function(){
			return store.state.type
        },
        islist:function(){
			return store.state.islist
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
            console.log(err)
            $.notify(err,0);
        })
    }
});

window.vueObj=vue;
window.worker=new Worker('common/js/worker.js');

$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
    
}