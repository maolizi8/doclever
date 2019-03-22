
var sessionChange=require("common/mixins/session");
var mainheader=require("component/mainHeader.vue");

var store=require("./store");
var statistics=require("./component/statistics.vue");


var vue=new Vue({
    el:"#app",
    data:{
        menu:"teststatistics"
    },
    mixins:[sessionChange],
    directives:{
        //proxy:proxyImg
    },
    components:{
        "mainheader":mainheader,
        
        "statistics":statistics
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

// window.vueObj=vue;
// window.worker=new Worker('common/js/worker.js');

$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
    
}