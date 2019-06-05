
//var report1=require("./component/report0.vue");
var pollinter=require("./component/pollInterSetting.vue");
//var store=require("./rep_store");
var sessionChange=require("common/mixins/session");
var mainheader=require("component/mainHeader.vue");

var vue=new Vue({
    el:"#app",
    data:{
        menu:"pollinter"
    },
    mixins:[sessionChange],
    directives:{
        
    },
    components:{
        "mainheader":mainheader,
        "pollinter":pollinter
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