<template>
   
        <el-col class="col" style="" id="showContent">
                <el-row class="row" style="padding:10px;">
                    <transition name="component-fade" mode="out-in">
                        <el-row class="row box-shadow" style="">
                            <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
                                自动化测试-定时任务
                                
                                <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click="setPollSender" v-if="sysRole">
                                    设置邮件发送者
                                </el-button>
                                <!-- <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click="showAdd=true">
                                   <i class="fa fa-plus"></i> 添加定时任务
                                </el-button> -->
                                <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px" @click="pollPop()" v-if="sysRole">
                                   <i class="fa fa-plus"></i> 添加定时任务
                                </el-button>
                                
                            </el-row>
                            <el-row class="row" style="height: 1px;background-color: lightgray"></el-row>
                            <el-row class="row" style="border-bottom-left-radius: 5px;border-bottom-right-radius: 5px">
                                <el-row class="row" style="height: 30px;line-height: 30px;text-align: center;background-color: #ebebeb" :style="{paddingRight:paddingRight+'px'}">
                                    <el-col class="col" :span="4">
                                        任务主题 
                                        <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="测试结果发送报告的主题">
                                            <i class="el-icon-info" style="font-size: 12px;"></i>
                                        </el-tooltip>
                                    </el-col>
                                    <el-col class="col" :span="7">
                                        测试项目/集合
                                    </el-col>
                                    <el-col class="col" :span="1">
                                        用例数
                                    </el-col>
                                    <el-col class="col" :span="2">
                                        创建者
                                    </el-col>
                                    <el-col class="col" :span="2">
                                        发送邮件
                                    </el-col>
                                    <el-col class="col" :span="2">
                                        仅失败发送
                                    </el-col>
                                    <el-col class="col" :span="2">
                                        是否开启
                                    </el-col>
                                    <el-col class="col" :span="4">
                                        操作
                                    </el-col>
                                </el-row>
                                <el-row class="row" style="overflow-y: auto;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px" id="">
                                    <el-row class="row" style="height: 40px;line-height: 40px;text-align: center;border-bottom: 1px solid #ccc;" v-for="(item,index) in arr" :key="index" >
                                        <el-col class="col" :span="4" style="overflow: hidden;text-overflow:ellipsis;">
                                            <span>{{item.name}}</span>
                                        </el-col>
                                        <el-col class="col" :span="7" style="overflow: hidden;text-overflow:ellipsis;">
                                            <el-tooltip class="item" effect="dark" :content="item.testProject.name+'/'+item.testCollection.name" placement="bottom">
                                                <span>{{item.testProject.name}}/{{item.testCollection.name}}</span>
                                            </el-tooltip>
                                        </el-col>
                                        <el-col class="col" :span="1">
                                            {{item.testCount}}
                                        </el-col>
                                        <el-col class="col" :span="2">
                                            {{item.owner.name}}
                                        </el-col>
                                        <el-col class="col" :span="2">
                                            <!-- {{item.failSend?"是":"否"}} -->
                                            <i class="el-icon-success" style="color: green" v-if="item.sendMail"></i>
                                            <i class="el-icon-error" style="color: red" v-else></i>
                                        </el-col>
                                        <el-col class="col" :span="2">
                                            <!-- {{item.failSend?"是":"否"}} -->
                                            <i class="el-icon-success" style="color: green" v-if="item.failSend"></i>
                                            <i class="el-icon-error" style="color: red" v-else></i>
                                        </el-col>
                                        <el-col class="col" :span="2">
                                            <!-- {{item.enabled?"是":"否"}} -->
                                            <i class="el-icon-success" style="color: green" v-if="item.enabled"></i>
                                            <i class="el-icon-error" style="color: red" v-else></i>
                                        </el-col>
                                        <el-col class="col" :span="4">
                                            <el-button type="text" size="mini" @click.native="pollPop(item)" v-if="sysRole">
                                                编辑
                                            </el-button>
                                            <el-button type="text" style="color: green" size="mini" @click.native="runPoll(item._id,index)" :loading="runPending[index].pending">
                                                立即运行
                                            </el-button>
                                            <a :href="'testpoll.html?pollid='+item._id" style="color: purple;font-size:12px;" target="_blank" rel="noopener noreferrer">历史记录</a>
                                            <!-- <el-button type="text" style="color: purple" size="mini" @click.native="runList(item._id)">
                                                历史记录
                                            </el-button> -->
                                            <el-button type="text" style="color: red" size="mini" @click.native="remove(index)" v-if="sysRole">
                                                删除
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </el-row>
                            </el-row>
                        </el-row>
                    </transition>
                
                
                </el-row>
        </el-col>

        

   
</template>
<style scoped>
    #pollListTable{
        border: 1px solid #cccccc;
    }
    #pollListTable tr{
        height: 30px;
        line-height: 30px;
        border: 1px solid #cccccc;
    }
    #pollListTable td{
        text-align: center;
        padding: 5px;
    }
    .el-row::after, .el-row::before {
        display: none;
    }
    .box-shadow{
        border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);background-color: white;height: 66%;
    }
</style>
<script>
    var sessionChange=require("common/mixins/session");

    module.exports={
        
        data:function () {
            return {

                showAdd:false,
                addPending:false,

                showConfig:false,
                confPending:false,

                
                collectionId:""
            }
        },
        
        mixins:[sessionChange],
        components:{
            
        },
        computed:{
            sysRole:function () {
                if (session.get("role")==0 || session.get("role")==2 ) {
                    return true
                } else {
                    return false
                }
            },
            arr:function () {
                return this.$store.state.pollList;
            },
            runPending:function () {
                var length=this.arr.length;
                var pendArr=[]
                for (let index = 0; index < length; index++) {
                    pendArr.push({
                        pending:false
                    })
                }
                return pendArr;
            },
        },
        methods:{
            info:function (item) {
                this.$store.dispatch("info",{
                    id:item._id,
                    name:item.name
                })
            },
            changeSort:function () {
                this.$store.commit("changeTeamSort",this.type);
            },
            
            pollPop:function (item) {
                var _this=this;
                $.startHud();
                var collectionId="";
                var testProjId="";
                var arr=[
                    net.get("/user/alllist",{}),
                    net.get("/test/collectionoftest",{}),
                ];
                if(item)
                {
                    arr.unshift(net.get("/poll/item",{
                        id:item._id
                    }))
                    collectionId=item.testCollection._id
                    testProjId=item.testProject._id
                    console.log("collectionId:"+collectionId)
                    console.log("testProjId:"+testProjId)
                }
                else
                {
                    arr.unshift({
                        code:0,
                        data:null
                    })
                }
                
                Promise.all(arr).then(function (data) {
                    $.stopHud();
                    var obj1=data[0];
                    var obj2=data[1];
                    var obj3=data[2];
                    //var obj4=data[3];
                    var poll,user,conllections;
                    //var sendInfo,test,baseUrl;
                    if(obj1.code==200)
                    {
                        poll=obj1.data;
                    }
                    else
                    {
                        poll=null;
                    }
                    if(obj2.code==200)
                    {
                        user=obj2.data;
                    }
                    else
                    {
                        throw obj2.msg;
                    }
                    if(obj3.code==200)
                    {
                        conllections=obj3.data;
                    }
                    else
                    {
                        throw obj3.msg;
                    }
                    
                    var child=$.showBox(_this,require("./poll.vue"),{
                        "propPoll":poll,
                        "propUser":user,
                        "collectionOfTest":conllections,
                        "collectionId":collectionId,
                        "testProjectId":testProjId,
                        "collectionEditable":true
                    })
                    // child.$on("remove",function (index) {
                    //     console.log('child.remove')
                    //     _this.arr.splice(index,1);
                    // })
                    child.$on("save",function (data) {
                        console.log('child.save')
                        window.location.reload()
                        // if (data.isnew) {
                        //     _this.arr.push(data.data)
                        // }
                    })
                }).catch(function (err) {
                    $.stopHud();
                    $.notify(err,0);
                })
            },
            runPoll:function (pollid,index) {
                var _this=this;
                this.runPending[index].pengding=true;
                net.post("/poll/run",{
                    poll:pollid,
                    operator:session.get("name")
                }).then(function (data) {
                    console.log("runPoll");
                    _this.runPending[index].pengding=false;
                    if(data.code==200)
                    {
                         $.notify("任务开始执行，请去历史记录查看运行结果",1);
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            },
            runList:function (pollid) {
                window.open("testpoll.html?pollid="+pollid,"_self")
            },
            setPollSender:function () {
                console.log('setPollSender')
                var _this=this;
                $.startHud();
                var pollSet;

                net.get("/poll/sendinfo",{}).then(function (data) {
                    $.stopHud();
                    
                    if(data.code==200)
                    {
                        pollSet=data.data;
                    }
                    else
                    {
                        pollSet=null;
                    }
                    
                    var child=$.showBox(_this,require("./sendInfo.vue"),{
                        "pollSet":pollSet
                    })
                }).catch(function (err) {
                    console.log(err)
                    $.stopHud();
                    $.notify(err,0);
                })

            },
            showDetail:function (item){
                console.log('showDetail')
                console.log(item)
            },
            remove:function (index){
                console.log('remove')
                console.log(index)
                var _this=this;
                var poll=this.arr[index]
                $.confirm("是否确认删除该定时任务",function () {
                    _this.removePending=true;
                    net.delete("/poll/item",{
                        id:poll._id
                    }).then(function (data) {
                        _this.removePending=false;
                        if(data.code==200)
                        {
                            $.notify("删除成功",1);
                            _this.showDialog=false;
                            _this.arr.splice(index,1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
        }
    }
</script>
