<template>
    <el-row class="row" id="reportcontent">
        <h2>
            <span style="font-size:80%;font-weight:normal;">测试集合：</span>
            {{info.projectName}}/{{info.collectionName}}
            <span style="font-size:80%;font-weight:normal;" v-if="info.status==99">【正在执行中】</span>
            </h2>
        <p>运行时间：{{info.createdAt}}</p>
        <table class="table" style="width:300px;">
            <tr>
                <th>失败</th>
                <th>总共</th>
                <th>成功</th>
                <th v-if="info.testUnkown">未校验</th>
            </tr>
            <tr>
                <td :style="{color:info.testFail?'red':''}">{{info.testFail||"0"}}</td>
                <td>{{info.testTotal||"0"}}</td>
                <td>{{info.testSuccess||"0"}}</td>
                <td v-if="info.testUnkown">{{info.testUnkown}}</td>
            </tr>
        </table>
        <!-- <div class="clear"></div> -->
        <div style="margin-top:10px;margin-bottom:10px;"> 
            <el-button size="mini" :type="statusRep==2?'primary':''" style="margin-right:3px;" @click.native="changeStatusList(2)">
                失败
            </el-button>
            <el-button size="mini" :type="statusRep==0?'primary':''" style="margin-right:3px;" @click.native="changeStatusList(0)">
                未校验
            </el-button>
            <el-button size="mini" :type="statusRep==1?'primary':''" style="margin-right:3px;" @click.native="changeStatusList(1)">
                成功
            </el-button>
            <el-button size="mini" :type="statusRep==99?'primary':''" style="margin-right:3px;" @click.native="changeStatusList(99)" v-if="info.status==99">
                进行中
            </el-button>
        </div>
		           
        <table class="table box-shadow">
            <thead>
                <tr>
                    <th style="width:55px;">顺序</th>
                    <th style="width:200px;">测试模块/业务</th>
                    <th style="width:200px;">测试用例</th>
                    <th style="width:55px;">状态</th>
                    <th style="">接口运行详情</th>
                </tr>
            </thead>
            <tbody id="testinfo">
				
				
				
                <tr v-for="(item,index) in runTestLists" :key="index">
                    <td>{{item.testOrder?item.testOrder:'-'}}</td>
                     <td>{{item.testModule}}/{{item.testGroup}}</td>
                    <td>
                        <span class="testname" @click="showOutput(item)">
                            {{item.testName}}
                        </span>
                    </td>
                    <td>
                        <span v-if="item.status==0" style="color: gray"><i class="el-icon-question"></i>未知</span> 
                        <span v-else-if="item.status==1" style="color: green"><i class="el-icon-success"></i>成功</span> 
                        <span v-else-if="item.status==2" style="color: red"><i class="el-icon-error"></i>失败</span> 
                        <span v-else-if="item.status==99"><i class="el-icon-loading"></i>运行中</span> 
                         <span v-else style="color: gray"><i class="el-icon-question"></i>未知</span> 
                    </td>
                    <!-- <td :style="{color:item.status==0?'grey':(item.status==1?'green':'red')}">{{item.status==0?"未校验":(item.status==1?"成功":"失败")}}</td> -->
                    <td>
                        <table class="table table-light">
                            <tbody>
                                <tr v-for="(inter,index) in item.interfaces" :key="index" style="font-size:14px;">
                                    <td class="line-num">{{index+1}}</td>
                                    <td style="text-align:left;word-break: break-all;">
                                        <u>{{inter.interBaseUrl}}{{inter.interPath}}</u>
                                        <span v-if="inter.runTime">（耗时:<span style="color:green;">{{inter.runTime}}</span>秒）</span>
                                        <span v-if="inter.errMessage">（<span style="color:red;">{{inter.errMessage}}</span>）</span>
                                    </td>
                                    <td style="width:32px;">
                                        <!-- <span v-if="inter.result.status" :style="{color:inter.result.status=='200'?'green':'red'}">{{inter.result.status}}</span> -->
                                        <span v-if="inter.result" :style="{color:inter.result.status=='200'?'green':'red'}">{{inter.result.status}}</span>
                                    </td>
                                    <td style="width:32px;font-size:12px;">
                                        <span @click="showDetails(inter)">详情</span>
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </td>
                </tr>
            </tbody>
            <!-- <tfoot>
                <tr style="text-align: center;vertical-align: middle">
                    <td colspan="5">
                        <page @change="changePage" ref="page" :pages="totalPages" :numofpage="numOfPage"></page>
                    </td>
                </tr>
            </tfoot> -->
        </table>
    </el-row>
   
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
    //var page=require("component/pageCompo.vue");
    module.exports={
        props:["info"],
        data:function () {
            return {
				
                statusRep:2,
                
				//numOfPage:20,
                runTestLists:[]
            }
        },
        directives:{
            
        },
        computed:{
			runId:function(){
				return getUrlParam("id");
            },
            // statusRep:function(){
			// 	return getUrlParam("status")?getUrlParam("status"):2;
            // },
			// totalPages:function(){
            //     if (this.statusRep==2) {
            //         var total=Math.ceil(this.info.testFail/this.numOfPage);
            //         console.log("report.vue>computed:>total testFail pages:")
            //         console.log(total)
            //         return total
            //     } else if (this.statusRep==1) {
            //         var total=Math.ceil(this.info.testSuccess/this.numOfPage);
            //         console.log("report.vue>computed:>total testSuccess pages:")
            //         console.log(total)
            //         return total
            //     } else if (this.statusRep==0) {
            //         var total=Math.ceil(this.info.testUnkown/this.numOfPage);
            //         console.log("report.vue>computed:>total testUnkown pages:")
            //         console.log(total)
            //         return total
            //     }
				
			// }
            // runTestLists:function () {
            //     console.log("report.vue>this.tests")
            //     console.log(this.tests)
            //     return this.tests;
            // },
        },
		components:{
            //"page":page
        },
        methods:{
           showDetails:function(inter){
               console.log("showDetails")
               console.log(inter)
               var _this=this;
              
               var child=$.showBox(_this,require("./testInterfaceOutput.vue"),{
                    "interfaceRunInfo":inter
                });
           },
           showOutput:function (item) {
                if(item.output)
                {
                    this.$alert("<div style='width: 100%;'>"+item.output+"</div>","用例输出：["+item.testName+"]", {
                        dangerouslyUseHTMLString: true
                    });
                }
                else
                {
                    $.tip("该用例无输出",0);
                }
            },
           changePage:function (page) {
                $.startHud();
				var _this=this;
				let query={
							id:_this.runId,
							page:page,
                            status:_this.statusRep
							}
				net.get("/poll/runinfotests2",query).then(function (data) {
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

            changeStatusList:function (status) {
                $.startHud();
                var _this=this;
                _this.statusRep=status;
                //_this.page=0
				let query={
							id:_this.runId,
                            page:0,
                            status:status
							}
				net.get("/poll/runinfotests2",query).then(function (data) {
					console.log("report.vue>runTestLists");
					if(data.code==200)
					{
						_this.runTestLists=data.data
						console.log("report.vue>_this.runTestLists(page)")
						console.log("page=0")
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
            },
            
        },
        created:function () {
            var id=getUrlParam("id");
             //var status=getUrlParam("status");

            var _this=this;
            let query={
							id:id,
							page:0,
                            status:_this.statusRep
							}
            net.get("/poll/runinfotests2",query).then(function (data) {
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
        }
    }
</script>