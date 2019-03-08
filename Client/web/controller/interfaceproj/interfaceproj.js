
var sessionChange=require("common/mixins/session");

var store=require("./store");
var mainheader=require("component/mainHeader.vue");
var maincontent=require("./component/mainContent.vue");

var vue=new Vue({
    el:"#app",
    data:{
        menu:"interface",
        islist:0,
		type:0
    },
    mixins:[sessionChange],
    directives:{
        
    },
    components:{
        "mainheader":mainheader,
        "maincontent":maincontent
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
            console.log(err)
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