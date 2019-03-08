
var sessionChange=require("common/mixins/session");

var store=require("./store");
var mainheader=require("component/mainHeader.vue");
var info=require("./info/info.vue");


var vue=new Vue({
    el:"#app",
    data:{
        menu:"interface",
        islist:1,
        //teamid:"",

        type:0,
        showTeam:false,
        applyPending:false,
        applyName:"",
        applyDis:""
        //,proxy:session.get("proxy")?true:false,
    },
    mixins:[sessionChange],
    directives:{
        //proxy:proxyImg
    },
    components:{
		"mainheader":mainheader,
        
        "info":info
    },
    store:store,
    watch:{
        
    },
    computed:{
        teamid:function(){
            console.log("teamid:")
            console.log(store.state.info.teamid)
            return store.state.info.teamid
        }
    },
    methods:{
        
    },
    created:function () {
        window.hljs.initHighlightingOnLoad();
        var _this=this;
        store.dispatch("init").then(function () {
            $.stopLoading();
        }).catch(function (err) {
            $.notify(err,0);
        })
        
    }
});

window.vueObj=vue;
//window.worker=new Worker('common/js/worker.js');

$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
}