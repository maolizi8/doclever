
var proxyImg=require("common/director/proxyImg");
var sessionChange=require("common/mixins/session");
var leftmenu=require("component/leftMenu.vue");
var ver=require("../../../../ver.json");
var store=require("./store");

//var team=require("./team.vue");
var list=require("./list/list.vue");
//var info=require("./info/info.vue");

session.remove("snapshotId");
session.remove("snapshotDis");
session.remove("snapshotCreator");
session.remove("snapshotDate");
session.remove("teamId");
session.remove("teamName");
session.remove("versionId");
session.remove("versionName");
session.remove("versionDis");
session.remove("projectType");
session.remove("projectId");
session.remove("projectName");

var vue=new Vue({
    el:"#app",
    data:{
        menu:"project",

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
        "leftmenu":leftmenu,
        "list":list
        //,"info":info
    },
    store:store,
    watch:{
        
    },
    computed:{
        
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
window.worker=new Worker('common/js/worker.js');
$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
    
}