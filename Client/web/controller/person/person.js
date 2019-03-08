
var sessionChange=require("common/mixins/session");
var mainheader=require("component/mainHeader.vue");

var store=require("./store");



var person=require("./person.vue");

// session.remove("snapshotId");
// session.remove("snapshotDis");
// session.remove("snapshotCreator");
// session.remove("snapshotDate");
// session.remove("teamId");
// session.remove("teamName");
// session.remove("versionId");
// session.remove("versionName");
// session.remove("versionDis");
// session.remove("projectType");
// session.remove("projectId");
// session.remove("projectName");

var vue=new Vue({
    el:"#app",
    data:{
        menu:"person",

        type:0,
        showTeam:false,
        applyPending:false,
        applyName:"",
        applyDis:""
       
    },
    mixins:[sessionChange],
    directives:{
        //proxy:proxyImg
    },
    components:{
        "mainheader":mainheader,
        
        "person":person
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
            $.stopLoading();
            $.notify(err,0);
        })
    }
});

window.vueObj=vue;
// window.worker=new Worker('common/js/worker.js');

$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
    
}