
var domainHost=require("./component/domainHost.vue");
var sessionChange=require("common/mixins/session");
var mainheader=require("component/mainHeader.vue");

var vue=new Vue({
    el:"#app",
    data:{
        menu:"domainhost"
    },
    mixins:[sessionChange],
    directives:{
        
    },
    components:{
        "mainheader":mainheader,
        "domainhost":domainHost
    },
    //store:store,

    watch:{
        
    },
    computed:{
        
    },
    methods:{
        
    },
    created : function () {
        
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