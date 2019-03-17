
var statistics=require("./component/statistics.vue");

var vue=new Vue({
    el:"#app",
    data:{
        id:"",
        info:{},
        tests:[]
    },
    directives:{
        
    },
    components:{
        "statistics":statistics
    },
    watch:{
        
    },
    computed:{
        
    },
    methods:{
        
    },
    created : function () {
        $.stopLoading();
        
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