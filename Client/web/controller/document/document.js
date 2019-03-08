
var sessionChange=require("common/mixins/session");
var leftmenu=require("component/leftMenu.vue");

var store=require("./store");

var doc=require("./component/doc.vue");


var vue=new Vue({
    el:"#app",
    data:{
        menu:"document"
    },
    mixins:[sessionChange],
    directives:{
        //proxy:proxyImg
    },
    components:{
        "leftmenu":leftmenu,
        "doc":doc
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