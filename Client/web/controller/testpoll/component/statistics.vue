<template>
    <el-row class="row" id="content">
        <h3>自动化测试统计</h3>
        <!-- <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
			<el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click.native="query">
				查询
			</el-button>
		</el-row> -->
		<el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
            <el-row class="row">
                <el-col class="col" :span="3">
                   选择定时任务:
                </el-col>
                <el-col class="col" :span="8">
                     <!-- <el-cascader size="mini" style="width: 95%" expand-trigger="hover" :options="testPollArr" v-model="selPoll" @change="changePoll" placeholder="请切换定时任务">
                    </el-cascader> -->
                    <el-select v-model="selPoll"  style="width: 90%"  >
                        <el-option value="" label="请选择定时任务"></el-option>
                        <el-option v-for="(item,index) in pollList"  :value="item._id" :label="item.name" :key="index" ></el-option>
                    </el-select>
                </el-col>
				<el-col class="col" :span="3">
                  <span style="color:red">*</span>选择周期:
                </el-col>
                <el-col class="col" :span="8">
                     <el-date-picker size="mini" style="width: 90%" 
					  v-model="periodDate"
					  type="daterange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期" value-format="yyyy-MM-dd" 
                      :unlink-panels="true">
					</el-date-picker>
                </el-col>
                <el-col class="col" :span="2">
                   <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click.native="query">
                        查询
                    </el-button>
                </el-col>
            </el-row>
		</el-form>
        <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
			统计周期：{{periodDate?periodDate[0]:"-"}} 至 {{periodDate?periodDate[1]:"-"}}
		</el-row> 
		 <table class="table box-shadow">
            <thead>
                <tr>
                    <th rowspan="2" style="width:100px;">定时任务</th>
                    <th rowspan="2" style="width:100px;">测试项目/集合</th>
                    <!-- <th rowspan="2" style="width:150px;">周期</th> -->
                    <th rowspan="1"  colspan="3" style="width:50px;">运行次数</th>
                    <!-- <th rowspan="2" style="width:50px;">总共/次</th>
                    <th rowspan="2" style="width:50px;">成功/次</th>
                    <th rowspan="2" style="width:50px;">失败/次</th> -->
                    <th rowspan="1"  colspan="7" style="width:50px;">失败原因</th>
                    <!-- <th style="background-color: #F5DEB3;">接口变更</th>
                    <th style="background-color: #F5DEB3;">应用异常有bug</th>
                    <th style="background-color: #F5DEB3;">测试环境异常</th>
                    <th style="background-color: #F5DEB3;">应用部署导致</th>
                    <th style="background-color: #F5DEB3;">其他原因</th>
                    <th style="background-color: #F5DEB3;">未标记原因</th> -->
                    <th rowspan="2"  style="width:40px;">详细</th>
                </tr>
                <tr>
                    <th style="width:50px;">总共</th>
                    <th style="width:50px;">成功</th>
                    <th style="width:50px;">失败</th>

                    <th style="background-color: #F5DEB3;">接口变更</th>
                    <th style="background-color: #F5DEB3;">应用异常有bug</th>
                    <th style="background-color: #F5DEB3;">测试环境异常</th>
                    <th style="background-color: #F5DEB3;">应用部署导致</th>
                    <th style="background-color: #F5DEB3;">用例问题</th>
                    <th style="background-color: #F5DEB3;">其他原因</th>
                    <th style="background-color: #F5DEB3;">未标记原因</th>
                </tr>
            </thead>
            <tbody id="testinfo">
				<tr v-for="(item,index) in arr" :key="index">
                    <td>{{item.name||"null"}}</td>
                    <td>
                        <el-tooltip class="item" effect="dark" :content="item.testProject.name+'/'+item.testCollection.name" placement="bottom">
                            <span>{{item.testCollection.name}}</span>
                        </el-tooltip>
                    </td>
                    <!-- <td>{{periodDate[0]}} 至 {{periodDate[1]}}</td> -->
                    <td>{{item.success+item.unkown+item.fail}}</td>
                    <td>{{item.success+item.unkown}}</td>
                    <td>
                        <span :style="{color:item.fail>0?'red':''}">{{item.fail}}</span><br>
                    </td>
                    <td>{{item.reason1}}</td>
                    <td>{{item.reason2}}</td>
                    <td>{{item.reason3}}</td>
                    <td>{{item.reason4}}</td>
                    <td>{{item.reason5}}</td>
                    <td>{{item.reason99}}</td>
                    <td>{{item.reason0}}</td>
                    <td>
                        <a :href="'testpoll.html?pollid='+item._id" style="color: purple;font-size:12px;" target="_blank" rel="noopener noreferrer">明细</a>
                    </td>
                </tr>
			</tbody>
        </table>
        <div class="clear"></div>
            
    </el-row>
   
</template>

<style>
    
    
    #content{
        padding:10px;
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
				//pollList:[{"name":"test1","_id":"111"},{"name":"test2","_id":"222"}],
				pollList:[],
                arr:[],
				
				numOfPage:20
            }
        },
        directives:{
            
        },
        computed:{
            // periodDate:function(){
            //     var d = new Date().format("yyyy-MM-dd");
            //     return [d,d]
            // },
			testPollArr:function(){
                if (this.pollList) {
                    var newList=this.pollList.map(function (obj) {
                    
                        var projObj={
                                        label:obj.name,
                                        value:obj._id
                                    }

                        return projObj
                    });
                    return newList
                }else{
                    return []
                }
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

                if (!this.periodDate) {
                    $.tip("请选择统计周期",0);
                    return;
                }
				// console.log("statistics.vue>query>this.periodDate")
				// console.log(this.periodDate)
				
				// console.log("statistics.vue>query>this.selPoll")
				// console.log(this.selPoll)
				$.startHud();
                var _this=this;
                
                let params={
                            startdate:_this.periodDate[0],
                            enddate:_this.periodDate[1]
                            }
				
				// let params={
                //             startdate:_this.periodDate[0].format("yyyy-MM-dd"),
                //             enddate:_this.periodDate[1].format("yyyy-MM-dd")
                //             }
                if (_this.selPoll) {
                    params.poll=_this.selPoll
                }
                console.log("statistics.vue>query>params")
				console.log(params)
                
				net.get("/poll/runstatistics",params).then(function (data) {
					console.log("statistics.vue>runstatistics");
					if(data.code==200)
					{
						_this.arr=data.data
						console.log("statistics.vue>_this.arr")
						console.log(_this.arr)
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
				/**/
		    },
        },
        created:function () {
		
            var _this=this;
            
            net.get("/poll/list",{}).then(function (data) {
                console.log("statistics.vue>polllist(simple)");
                if(data.code==200)
                {
                    _this.pollList=data.data
                    console.log("statistics.vue>_this.pollList")
                    console.log(_this.pollList)
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
            })/**/
        }
    }
</script>