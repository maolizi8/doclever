<template>
    <el-row class="row" id="content">
        <h2><span style="font-size:80%;font-weight:normal;">自动化测试统计</span></h2>
        <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
			<el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click.native="query">
				查询
			</el-button>
		</el-row>
		
		<el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
            <el-row class="row">
                <el-col class="col" :span="4">
                   选择定时任务:
                </el-col>
                <el-col class="col" :span="8">
                     <el-cascader size="mini" style="width: 95%" expand-trigger="hover" :options="testPollArr" v-model="selPoll" @change="changePoll" placeholder="请切换定时任务">
                    </el-cascader>
                </el-col>
				<el-col class="col" :span="4">
                   选择周期:
                </el-col>
                <el-col class="col" :span="8">
                     <el-date-picker size="mini" style="width: 95%" 
					  v-model="periodDate"
					  type="daterange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
					</el-date-picker>
                </el-col>
            </el-row>
		</el-form>
		
		<table class="table box-shadow">
            <thead>
                <tr>
                    <th style="width:100px;">定时任务</th>
                    <th style="width:200px;">周期</th>
                    <th style="width:200px;">统计结果</th>
                    <th style="width:55px;">操作</th>
                </tr>
            </thead>
            <tbody id="testinfo">
				<tr v-for="(item,index) in arr" :key="index">
                    <td>{{item.name||"null"}}</td>
                    <td>{{item.name||"null"}}</td>
                    <td>{{item.name||"null"}}</td>
                    <td>{{item.name||"null"}}</td>
                </tr>
			</tbody>
        </table>
        <div class="clear"></div>
            <!--            
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
				
				<tr style="text-align: center;vertical-align: middle">
                    <td colspan="5">
                        <page @change="changePage" ref="page" :total="totalPages" :numofpage="numOfPage"></page>
                    </td>
                </tr>
				
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
                                    <span v-if="inter.result.status" :style="{color:inter.result.status=='200'?'green':'red'}">{{inter.result.status}}</span>
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
            <tfoot>
                <tr style="text-align: center;vertical-align: middle">
                    <td colspan="5">
                        <page @change="changePage" ref="page" :total="totalPages" :numofpage="numOfPage"></page>
                    </td>
                </tr>
            </tfoot>
        </table> 
		-->
    </el-row>
   
</template>

<style>
    
    
    #content{
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
				selPoll:"",
				pollList:[{"name":"test1","_id":"111"},{"name":"test2","_id":"222"}],
				
                arr:[],
				
				numOfPage:20
            }
        },
        directives:{
            
        },
        computed:{
			testPollArr:function(){
                var newList=this.pollList.map(function (obj) {
                    
                    var projObj={
                                    label:obj.name,
                                    value:obj._id
                                }

                    return projObj
                });
                return newList
            }
			/*
			totalPages:function(){
				var total=Math.ceil(this.info.testTotal/this.numOfPage);
				console.log("report.vue>computed:>total pages:")
				console.log(total)
				return total
			}*/
            // runTestLists:function () {
            //     console.log("report.vue>this.tests")
            //     console.log(this.tests)
            //     return this.tests;
            // },
        },
		components:{
            "page":page
        },
        methods:{
            changePoll:function(){
				console.log("statistics.vue>changePoll>this.selPoll")
				console.log(this.selPoll)
		    },
           changePage:function (page) {
                $.startHud();
				var _this=this;
				/*
				let query={
							id:_this.runId,
							page:page
							}
				net.get("/poll/runinfotests",query).then(function (data) {
					console.log("statistics.vue>runTestLists");
					if(data.code==200)
					{
						_this.runTestLists=data.data
						console.log("statistics.vue>_this.runTestLists(page)")
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
				*/
                
            },
			
			query:function(){
				console.log("statistics.vue>query>this.periodDate")
				console.log(this.periodDate)
				
				console.log("statistics.vue>query>this.selPoll")
				console.log(this.selPoll)
				$.startHud();
				var _this=this;
				/*
				let query={
							period:_this.runId,
							page:page
							}
				net.get("/poll/runinfotests",query).then(function (data) {
					console.log("statistics.vue>runTestLists");
					if(data.code==200)
					{
						_this.runTestLists=data.data
						console.log("statistics.vue>_this.runTestLists(page)")
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
				*/
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
            })*/
        }
    }
</script>