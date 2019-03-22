<template>
   <el-col class="col" style="" id="showContent">
        <el-row class="row" style="padding:10px;">
            <transition name="component-fade" mode="out-in">
                <el-row class="row box-shadow" style="">
                    <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
                        定时任务-运行记录
                         <!-- &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="statistics.html" style="color: purple;font-size:12px;" target="_blank" v-if="sysRole==0 || sysRole==2 ">
                            去统计<i class="el-icon-d-arrow-right"></i></a> -->

                        <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click.native="runPoll(pollId)">
                                                立即运行
                                            </el-button>
                    </el-row>
                    <el-row class="row" style="height: 1px;background-color: lightgray"></el-row>
                    <el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
                        <el-row class="row">
                            <el-col class="col" :span="4">
                                <span style="color:red;">*</span>选择周期:
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
                            <el-col class="col" :span="8">
                                <!-- <el-switch v-model="sortByFail" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch> -->
                    
                                <el-checkbox label="失败次数高的排序靠前" v-model="sortByFail"></el-checkbox>
                            </el-col>
                            <el-col class="col" :span="4">
                            <el-button type="primary" size="mini" style="margin-left: 10px;" @click.native="query">
                                    查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row class="row" style="border-bottom-left-radius: 5px;border-bottom-right-radius: 5px">
                        <el-row class="row" style="height: 30px;line-height: 30px;text-align: center;background-color: #ebebeb" :style="{paddingRight:paddingRight+'px'}">
                            <el-col class="col" :span="3">
                                任务主题 
                                <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="测试结果发送报告的主题">
                                    <i class="el-icon-info" style="font-size: 12px;"></i>
                                </el-tooltip>
                            </el-col>
                            <el-col class="col" :span="5">
                                测试项目/集合
                            </el-col>
                            <el-col class="col" :span="7">
                                测试模块/业务/用例
                            </el-col>
                            <el-col class="col" :span="2">
                                操作者
                            </el-col>
                            <el-col class="col" :span="1">
                               状态
                            </el-col>
                            <el-col class="col" :span="3">
                               运行时间
                            </el-col>
                            <el-col class="col" :span="3">
                                操作
                            </el-col>
                        </el-row>
                        <el-row class="row" style="overflow-y: auto;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px" id="">
                            <el-row class="row" style="line-height: 30px;text-align: center;border-bottom: 1px solid #ccc;" v-for="(item,index) in runArr" :key="index" >
                                <el-col class="col" :span="3" style="overflow: hidden;text-overflow:ellipsis;">
                                    <span>{{item.pollName}}</span>
                                </el-col>
                                <el-col class="col" :span="5" style="overflow: hidden;text-overflow:ellipsis;">
                                    <el-tooltip class="item" effect="dark" :content="item.projectName+'/'+item.collectionName" placement="bottom">
                                        <span>{{item.projectName}}/{{item.collectionName}}</span>
                                    </el-tooltip>
                                </el-col>
                                <el-col class="col" :span="7" style="text-align:left;font-size:14px;padding: 2px 0;">
                                    共{{item.testTotal}}个测试用例（失败{{item.testFail}}个，成功{{item.testSuccess}}个，未校验{{item.testUnkown}}个）
                                    <!-- <table class="table table-light">
                                        <tr v-for="(test,index) in item.tests" :key="index">
                                            <td class="line-num">{{index+1}}</td>
                                            <td style="text-align:left;">
                                                {{test.testModule}}/{{test.testGroup}}/{{test.testName}}（<span style="color:green">{{test.interfaces.length}}</span>个接口）<br> 
                                            </td>
                                            <td style="width:32px;"  :style="{color:test.status==0?'grey':(test.status==1?'green':'red')}">
                                                {{test.status==0?"未校验":(test.status==1?"成功":"失败")}}
                                            </td>
                                        </tr>
                                    </table> -->
                                </el-col>
                                <el-col class="col" :span="2">
                                    {{item.operator?item.operator:"system"}}
                                </el-col>
                                <el-col class="col" :span="1">
                                    <i class="el-icon-question" style="color: gray" v-if="item.status==0"></i>
                                    <i class="el-icon-loading" v-else-if="item.status==99"></i>
                                    <i class="el-icon-success" style="color: green" v-else-if="item.status==2"></i>
                                    <i class="el-icon-error" style="color: red" v-else-if="item.status==3"></i>
                                    <i class="el-icon-warning" style="color: orange" v-else-if="item.status==4"></i>
                                </el-col>
                                <el-col class="col" :span="3">
                                    <!-- {{item.createdAt}} 至 {{item.updatedAt}} -->
                                    <el-tooltip class="item" effect="dark" :content="item.createdAt+'至'+item.updatedAt" placement="bottom">
                                        <span style="font-size:12px;line-height: 20px;">{{item.createdAt}} 至 {{item.updatedAt}}</span>
                                    </el-tooltip>
                                </el-col>
                                <el-col class="col" :span="3">
                                    <a :href="'report.html?id='+item._id" target="_blank" style="color: purple;font-size:12px;">详情</a>
                                    <template  v-if="item.status==3 || item.status==4 ">
                                        <el-button v-if="item.failReason" type="text" size="mini" style="margin-left:3px;" @click.native="editFailReason(item)">
                                            <span v-if="item.failReason.reason==1">接口变更</span>
                                            <span v-if="item.failReason.reason==2">应用异常有bug</span>
                                            <span v-if="item.failReason.reason==3">测试环境异常</span>
                                            <span v-if="item.failReason.reason==4">应用部署导致</span>
                                            <span v-if="item.failReason.reason==5">用例问题</span>
                                            <span v-if="item.failReason.reason==99">其他</span>
                                        </el-button>
                                        <el-button v-else type="text" size="mini" style="margin-left:3px;color:green;" @click.native="editFailReason(item)">
                                            失败原因
                                        </el-button>
                                    </template>

                                    
                                    <el-button type="text" size="mini" style="margin-left:3px;color:red;" @click.native="deleteRunRecord(item._id)" v-if="item.status==99 || sysRole==0 ">
                                        删除
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-row>

                        <el-row class="row" >
                            <!-- <page @change="changePage" ref="page"></page> -->
                            <page @change="changePage" ref="page" :pages="totalPages" :numofpage="numOfPage"></page>
                        </el-row>
                    </el-row>
                </el-row>
            </transition>
        
        </el-row>
    </el-col>
</template>

<style scoped>
    
    .box-shadow{
        border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);background-color: white;height: 66%;
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
    
    .clear{
        height:20px;
        clear: both;
    }
    .line-num{
        background-color: #eeeeee;
        width: 15px;
    }

</style>
<script>
    var sessionChange=require("common/mixins/session");
   // var page=require("component/page.vue");
     var page=require("component/pageCompo.vue");
    module.exports={
        
        data:function () {
            return {
                periodDate:"",
                sortByFail:false,

                //listTotal:0,
				numOfPage:20
            }
        },
        
        mixins:[sessionChange],
        components:{
            "page":page
        },
        computed:{
            sysRole:function () {
                // if (session.get("role")==0 || session.get("role")==2 ) {
                //     return true
                // } else {
                //     return false
                // }
                return session.get("role")
            },
            pollId:function () {
               
                return this.$store.state.pollid;
               
            },
            runArr:function () {
                // console.log("runList.vue>pollRunList")
                // console.log(this.$store.state.pollRunList)
                return this.$store.state.pollRunList;
               
            },
            pollRunTotal:function(){
				return this.$store.state.pollRunTotal;
			},
            totalPages:function(){
				var total=Math.ceil(this.$store.state.pollRunTotal/this.numOfPage);
				console.log("runList.vue>computed:>total pages:")
				console.log(total)
				return total
			}
        },
        methods:{
            
            runInfo:function (info) {
                var _this=this;
                window.open('report.html?id='+info._id)
                // $.showBox(_this,require("./runInfo.vue"),{
                //     "pollRunInfo":info
                // })
                // $.startHud();
                // net.post("/poll/runinfo",{
                //     id:runid
                // }).then(function (data) {
                //     console.log("runInfo");
                //     $.stopHud();
                //     if(data.code==200)
                //     {
                //         $.showBox(_this,require("./runInfo.vue"),{
                //             "pollRunInfo":data.data
                //         })
                //     }
                //     else
                //     {
                //         $.notify(data.msg,0)
                //     }
                // }).catch(function (err) {
                //     $.stopHud();
                //     $.notify(err,0);
                // })
            },
            runPoll:function (pollid) {
                var _this=this;
                net.post("/poll/run",{
                    poll:pollid,
                    operator:session.get("name")
                }).then(function (data) {
                    console.log("runPoll");
                    if(data.code==200)
                    {
                         $.notify("任务开始执行，请去历史记录查看运行结果",1);
                         
                        window.location.reload()
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            },
            editFailReason:function (runitem) {
                var _this=this;

                var child=$.showBox(_this,require("./recordFailRunReason.vue"),{
                    "pollRun":runitem
                    // "pollRun":{
                    //     "reason":data.failReason?data.failReason:99,
                    //     "other":data.otherReasons?data.otherReasons:"其他"
                    // }
                })
                child.$on("save",function (data) {
                    console.log(data)
                     window.location.reload()
                })
               
            },
            deleteRunRecord:function (runid) {
                var _this=this;
                
                $.notify("功能开发中",1);
                // net.post("/poll/run",{
                //     poll:pollid,
                //     operator:session.get("name")
                // }).then(function (data) {
                //     console.log("runPoll");
                //     if(data.code==200)
                //     {
                //          $.notify("任务开始执行，请去历史记录查看运行结果",1);
                //     }
                //     else
                //     {
                //         $.notify(data.msg,0)
                //     }
                // })
            },
            changePage:function (page) {
                var query={
                    page:page
                }
                console.log("runList.vue>page: "+page)
                $.startHud();
                this.$store.dispatch("pollRunHistoryList",query).then(function (data) {
                    $.stopHud();
                    if(data.code!=200)
                    {
                        $.notify(data.msg,0);
                    }
                });
            },
            query:function(){

                if (!this.periodDate) {
                    $.tip("请选择统计周期",0);
                    return;
                }
				console.log("runList.vue>query>this.periodDate")
				console.log(this.periodDate)
				
				console.log("runList.vue>query>this.sortByFail")
				console.log(this.sortByFail)
				$.startHud();
                var _this=this;
                
                let params={
                            poll:_this.$store.state.pollid,
                            page:0,
                            startdate:_this.periodDate[0],
                            enddate:_this.periodDate[1],
                            sortByFail:_this.sortByFail?1:0
                            }
                console.log("runList.vue>query>params")
                console.log(params)

                // return net.post("/poll/runlist",params).then(function (data) {
                    
                //     if(data.code==200)
                //     {
                //         _this.$store.state.pollRunList=data.data;
                //     }
                //     else
                //     {
                //         $.notify(data.msg,0)
                //     }
                //     $.stopLoading();
				// 	$.stopHud();
                // })
                 Promise.all([
                    net.get("/poll/runlistcount",{
                            poll:_this.$store.state.pollid,
                            startdate:_this.periodDate[0],
                            enddate:_this.periodDate[1]
                            }),
                    net.post("/poll/runlist",params)
                ]).then(function (result) {
                    var obj1=result[0];
                    var obj2=result[1];
                    if(obj1.code==200)
                    {
                        _this.$store.state.pollRunTotal=obj1.data
                    }
                    else
                    {
                        throw obj1.msg;
                    }
                    if(obj2.code==200)
                    {
                        _this.$store.state.pollRunList=obj2.data;
                    }
                    else
                    {
                        throw obj2.msg;
                    }
                    $.stopHud();
                    $.stopLoading();
                }).catch(function (err) {
                    $.stopLoading();
                    $.stopHud();
                    $.notify(err,0);
                })
		    },
        }
    }
</script>
