<template>
	<div class="block">
		<span class="demonstration">默认</span>
		<el-date-picker
		  v-model="periodDate"
		  type="daterange"
		  range-separator="至"
		  start-placeholder="开始日期"
		  end-placeholder="结束日期">
		</el-date-picker>
	</div>
</template>

<style>
    
    #reportcontent{
        padding:10px 20px;
    }
    .table{
        width: 100%;
        padding: 10px;
        display: table;
        border-collapse: collapse;
        border-spacing: 2px;
        border:1px solid #cccccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        background-color: white;
    }
    .table th{
        background-color: #E0EEEE;
    }
    .table th,.table td{
        vertical-align: middle;
        padding: 5px;
        text-align: center;
        border:1px solid #cccccc;
    }
    .table-light{
        border:1px solid #eeeeee;
    }
    .table-light th,.table-light td{
        border:1px solid #eeeeee;
    }
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;
    }
    
    .clear{
        height:20px;
        clear: both;
    }
    .line-num{
        background-color: #eeeeee;
        width: 15px;
    }
    .testname{
        color:blue;
        cursor: pointer;
    }
    .testname:hover{
        text-decoration: underline;
    }
    .el-message-box{
        width: 600px;
    }
    .el-message-box__content {
        min-height: 300px;
        height: 500px;
        overflow-y: scroll;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>

<script>
    var page=require("component/pageCompo.vue");
    module.exports={
        props:["info"],
        data:function () {
            return {
				periodDate:"",
				
				numOfPage:20,
                runTestLists:[]
            }
        },
        directives:{
            
        },
        computed:{
			
        },
		components:{
            "page":page
        },
        methods:{
           
           changePage:function (page) {
                $.startHud();
				var _this=this;
				let query={
							id:_this.runId,
							page:page
							}
				net.get("/poll/runinfotests",query).then(function (data) {
					console.log("report.vue>runTestLists");
					if(data.code==200)
					{
						_this.runTestLists=data.data
						console.log("report.vue>_this.runTestLists(page)")
						console.log("page="+page)
						console.log(_this.runTestLists)
					}
					else
					{
						$.notify(data.msg,0)
					}
					$.stopLoading();
					$.stopHud();
				}).catch(function (err) {
					$.stopLoading();
					$.stopHud();
					$.notify(err,0);
				})
                // this.$store.dispatch("userList",query).then(function (data) {
                //     $.stopHud();
                //     if(data.code!=200)
                //     {
                //         $.notify(data.msg,0);
                //     }
                // });
            },
        },
        created:function () {
		/*
            var id=getUrlParam("id");

            var _this=this;
            let query={
							id:id,
							page:0
							}
            net.get("/poll/runinfotests",query).then(function (data) {
                console.log("report.vue>runTestLists");
                if(data.code==200)
                {
                    _this.runTestLists=data.data
                    console.log("report.vue>_this.runTestLists")
                    console.log(_this.runTestLists)
                }
                else
                {
                    $.notify(data.msg,0)
                }
                $.stopLoading();
            }).catch(function (err) {
                $.stopLoading();
                $.stopHud();
                $.notify(err,0);
            })
			*/
        }
    }
</script>