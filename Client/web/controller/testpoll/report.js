
//var report1=require("./component/report0.vue");
var report=require("./component/report.vue");

var vue=new Vue({
    el:"#app",
    data:{
        id:"",
        info:{},
        infoone:{}
    },
    directives:{
        
    },
    components:{
        //"reportone":report1,
        "report":report
    },
    watch:{
        
    },
    computed:{
        
    },
    methods:{
        
    },
    created : function () {
        //window.hljs.initHighlightingOnLoad();
        this.id=getUrlParam("id");

        var _this=this;
        let query={id:_this.id}
        net.get("/poll/runinfo2",query).then(function (data) {
            console.log("runInfo");
            $.stopLoading();
            if(data.code==200)
            {
               _this.info=data.data
            }
            else
            {
                $.notify(data.msg,0)
            }
        }).catch(function (err) {
            $.stopLoading();
            $.stopHud();
            $.notify(err,0);
        })
        
        // Promise.all([
        //     net.get("/poll/runinfo",query),
        //     net.get("/poll/runinfo2",query)
        // ]).then(function (data) {
        //     var obj1=data[0];
        //     var obj2=data[1];
        //     if(obj1.code==200)
        //     {
        //         _this.info=obj1.data
        //     }
        //     else
        //     {
        //         throw obj1.msg;
        //     }
        //     if(obj2.code==200)
        //     {
        //         _this.infoone=obj2.data
        //     }
        //     else
        //     {
        //         throw obj2.msg;
        //     }
        //     $.stopLoading();
        // })

        
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