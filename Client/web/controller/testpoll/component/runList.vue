<template>
   <el-col class="col" style="" id="showContent">
        <el-row class="row" style="padding:10px;">
            <transition name="component-fade" mode="out-in">
                <el-row class="row box-shadow" style="">
                    <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
                        <span style="font-weight:bold;color:black;font-size: 16px;">
                            {{pollInfo.name}}
                        </span>
                         - 运行记录   
                         (当前配置： <span style="font-weight:bold;color:black;font-size: 16px;" :style="{'color':pollInfo.runEnvironment?'red':'black'}">
                            {{pollInfo.runEnvironment?'生产环境':'测试环境'}}
                        </span>)
                        
                        <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click.native="runPoll(pollId)"  v-if="(sysRole==0 || sysRole==1) || pollInfo.runEnvironment==0 " >
                            立即运行
                        </el-button>
                    </el-row>
                    <el-row class="row" style="height: 1px;background-color: lightgray"></el-row>
                    <el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
                        <el-row class="row">
                            <el-col class="col" :span="3">
                                <span style="color:red;">*</span>选择周期:
                            </el-col>
                            <el-col class="col" :span="7">
                                <el-date-picker size="mini" style="width: 90%" 
                                v-model="periodDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" value-format="yyyy-MM-dd" 
                                :unlink-panels="true">
                                </el-date-picker>
                            </el-col>
                            <el-col class="col" :span="3">
                                选择环境：
                            </el-col>
                            <el-col class="col" :span="5">
                               <el-select size="small" v-model="runEnvironment" style="">
                                    <el-option  value="0" label="测试环境"></el-option>
                                    <el-option  value="1" label="生产环境" style="color:red;" v-if="sysRole==0 || sysRole==1 || sysRole==2 "></el-option>
                                </el-select>
                            </el-col>
                            <el-col class="col" :span="4">
                                 <el-checkbox label="失败次数高的排序靠前" v-model="sortByFail"></el-checkbox>
                            </el-col>
                            <el-col class="col" :span="2">
                                <el-button type="primary" size="mini" style="margin-left: 10px;" @click.native="query">
                                    查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>

                    


                    <el-row class="" style="border-bottom-left-radius: 5px;border-bottom-right-radius: 5px">
                        <table class="table box-shadow">
                            <thead>
                                <tr>
                                    <th style="">测试项目/集合</th>
                                    <th style="">运行环境</th>
                                    <th style="">用例数</th>
                                    <th style="">失败</th>
                                    <th style="">成功</th>
                                    <th style="">未校验</th>
                                    <th style="">通过率</th>
                                    <th style="">操作者</th>
                                    <th style="">状态</th>
                                    <th style="">运行时间</th>
                                    <th style="width:150px">操作</th>
                                </tr>
                            </thead>
                            <tbody id="">
                                <tr v-for="(item,index) in runArr" :key="index">
                                    <td>
                                        <el-tooltip class="item" effect="dark" :content="item.projectName+'/'+item.collectionName" placement="bottom">
                                            <span>{{item.projectName}}/{{item.collectionName}}</span>
                                        </el-tooltip>
                                    </td>
                                    <td>
                                        {{item.runEnvironment?'生产环境':'测试环境'}}
                                    </td>
                                    <td>
                                        {{item.testTotal}}
                                    </td>
                                    <td>
                                        {{item.testFail}}
                                    </td>
                                    <td>
                                        {{item.testSuccess}}
                                    </td>
                                    <td>
                                        {{item.testUnkown}}
                                    </td>
                                    <td>
                                       {{Math.round((item.testSuccess/item.testTotal)* 10000)/100}}%
                                    </td>
                                    <td>
                                       {{item.operator?item.operator:"system"}}
                                    </td>
                                    <td>
                                       <i class="el-icon-question" style="color: gray" v-if="item.status==0"></i>
                                        <i class="el-icon-loading" v-else-if="item.status==99"></i>
                                        <i class="el-icon-success" style="color: green" v-else-if="item.status==2"></i>
                                        <i class="el-icon-error" style="color: red" v-else-if="item.status==3"></i>
                                        <i class="el-icon-warning" style="color: orange" v-else-if="item.status==4"></i>
                                    </td>
                                    <td>
                                       <span style="font-size:12px;line-height: 20px;" v-if="item.status==0">
                                            {{item.createdAt}} 至 <br />{{item.testsEndAt?item.testsEndAt:item.updatedAt}}
                                        </span>
                                        <span style="font-size:12px;line-height: 20px;"  v-else-if="item.status==2">
                                            {{item.createdAt}} 至 <br />{{item.testsEndAt?item.testsEndAt:item.updatedAt}}
                                        </span>
                                        <span style="font-size:12px;line-height: 20px;" v-else>
                                            {{item.createdAt}} 至 <br />{{item.testsEndAt?item.testsEndAt:"--"}}
                                        </span>
                                    </td>
                                    <td>
                                       <!-- <a :href="'report0.html?id='+item._id+'&env='+item.runEnvironment" target="_blank" style="color: purple;font-size:12px;">详情1</a> -->
                                        <a :href="'report.html?id='+item._id+'&env='+item.runEnvironment" target="_blank" style="color: purple;font-size:12px;">详情</a>
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
                                    </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </el-row>
                    <el-row class="row" >
                        <!-- <page @change="changePage" ref="page"></page> -->
                        <page @change="changePage" ref="page" :pages="totalPages" :numofpage="numOfPage"></page>
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
                runEnvironment:"0",
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
               
                return session.get("role")
            },
            pollId:function () {
               
                return this.$store.state.pollid;
               
            },
            pollInfo:function () {
               
                return this.$store.state.pollInfo;
               
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

                 $.notify('手动运行的功能暂时不开放！',0);
                return;
                
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

                if (this.periodDate.length==1) {
                    $.tip("统计周期开始和结束时间不可只填一个！",0);
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
                            runEnvironment:_this.runEnvironment,
                            //startdate:_this.periodDate[0],
                            //enddate:_this.periodDate[1],
                            sortByFail:_this.sortByFail?1:0
                            }
                if (this.periodDate.length==2) {
                    params.startdate=_this.periodDate[0]
                    params.enddate=_this.periodDate[1]
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
                            runEnvironment:_this.runEnvironment,
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
