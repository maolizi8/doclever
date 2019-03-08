var store=require("./store");
var interfacelist=require("./component/interfaceList.vue");

var vue=new Vue({
    el:"#app",
    data:{
       
    },
    components:{
        "interfacelist":interfacelist
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
//window.worker=new Worker('common/js/worker.js');
$.ready(function () {
    $.startLoading();
});

if (module.hot) {
    module.hot.accept();
    
}