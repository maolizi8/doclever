<template>
    <el-dialog :title="propPoll?'编辑定时任务':'创建定时任务'"  width="80%" ref="box" :visible.sync="showDialog" append-to-body>
        <el-row class="row">
            <span style="color: red">带有input和文件上传的用例，在无人干预的情况下测试可能会失败！</span>
        </el-row>

        <el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   选择测试集合:
                </el-col>
                <el-col class="col" :span="20">
                     <el-cascader size="mini" style="width: 90%" expand-trigger="hover" :options="testCollectionArr" v-model="selConllectionProject" @change="changeCollection" placeholder="请切换测试项目/测试集合">
                    </el-cascader>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   任务主题:
                </el-col>
                <el-col class="col" :span="20">
                    <el-input style="width: 90%" size="small" v-model="poll.name" placeholder="请输入输入任务主题"></el-input>
                    <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="测试结果发送报告的主题">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                  定时任务开启:
                </el-col>
                <el-col class="col" :span="20">
                    <el-switch v-model="poll.enabled" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                    <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（是），红色（否）">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col>
                <!-- <el-col class="col" :span="4">
                  立即执行一次:
                </el-col>
                <el-col class="col" :span="8">
                    <el-switch v-model="immediate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（是），红色（否）">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col> -->
            </el-row>
            <el-row class="row" v-if="poll.enabled">
                <el-col class="col" :span="4">
                  时刻1:
                </el-col>
                <el-col class="col" :span="20">
                    <el-checkbox-group v-model="poll.time">
                        <el-checkbox :label="n-1" v-for="n in 24" :key="n-1">{{n-1}}:00</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="row" v-if="poll.enabled">
                <el-col class="col" :span="4">
                  时刻2:
                </el-col>
                <el-col class="col" :span="20">
                    <el-checkbox-group v-model="poll.time2">
                        <el-checkbox :label="n-1" v-for="n in 24" :key="n-1">{{n-1}}:30</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <!-- <el-row class="row line-36">
                <el-col class="col" :span="4">
                  时刻1:
                </el-col>
                <el-col class="col" :span="20">
                     <el-select v-model="poll.time" multiple placeholder="请选择"  style="width: 90%" size="small" >
                        <el-option v-for="n in 24" :key="n-1" :label="n-1" :value="{n-1}:00" ></el-option>
                    </el-select> 
                </el-col>
            </el-row>-->
            <el-row class="row line-36" v-if="poll.enabled">
                <el-col class="col" :span="4">
                  星期:
                </el-col>
                <el-col class="col" :span="20">
                     <el-checkbox-group v-model="poll.date">
                        <el-checkbox :label="0">周一</el-checkbox>
                        <el-checkbox :label="1">周二</el-checkbox>
                        <el-checkbox :label="2">周三</el-checkbox>
                        <el-checkbox :label="3">周四</el-checkbox>
                        <el-checkbox :label="4">周五</el-checkbox>
                        <el-checkbox :label="5">周六</el-checkbox>
                        <el-checkbox :label="6">周日</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                  发送邮件:
                </el-col>
                <el-col class="col" :span="8">
                    <el-switch v-model="poll.sendMail" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                    <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（是），红色（否）">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col>
                <el-col class="col" :span="4">
                  用例失败才发送:
                </el-col>
                <el-col class="col" :span="8">
                    <el-switch v-model="poll.failSend" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                    <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="绿色（是），红色（否）">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
         </el-form>
        
        <!-- <el-form ref="form" label-width="130px">
            <el-form-item label="选择测试集合:" v-if="collectionEditable==true">
                <el-cascader size="mini" style="width: 90%" expand-trigger="hover" :options="testCollectionArr" v-model="selConllectionProject" @change="changeCollection" placeholder="请切换测试项目/测试集合">
                </el-cascader>
            </el-form-item>
            <el-form-item label="任务主题:">
                <el-input style="width: 90%" size="small" v-model="poll.name" placeholder="请输入输入任务主题"></el-input>
                 <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="测试结果发送报告的主题">
                    <i class="el-icon-info" style="font-size: 12px;"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="定时任务开启:" style="text-align: left;">
                <el-switch v-model="poll.enabled" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（开），红色（关）">
                    <i class="el-icon-info" style="font-size: 12px;"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="时刻:" style="text-align: left">
                <el-checkbox-group v-model="poll.time">
                    <el-checkbox :label="n-1" v-for="n in 24" :key="n-1">{{n-1}}:00</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="星期:" style="text-align: left">
                <el-checkbox-group v-model="poll.date">
                    <el-checkbox :label="0">周一</el-checkbox>
                    <el-checkbox :label="1">周二</el-checkbox>
                    <el-checkbox :label="2">周三</el-checkbox>
                    <el-checkbox :label="3">周四</el-checkbox>
                    <el-checkbox :label="4">周五</el-checkbox>
                    <el-checkbox :label="5">周六</el-checkbox>
                    <el-checkbox :label="6">周日</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="立即执行一次:" style="text-align: left;">
                <el-switch v-model="immediate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（开），红色（关）">
                    <i class="el-icon-info" style="font-size: 12px;"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="发送邮件:" style="text-align: left;">
                <el-switch v-model="poll.sendMail" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（开），红色（关）">
                    <i class="el-icon-info" style="font-size: 12px;"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="用例失败才发送:" style="text-align: left;">
                <el-switch v-model="poll.failSend" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="绿色（开），红色（关）">
                    <i class="el-icon-info" style="font-size: 12px;"></i>
                </el-tooltip>
            </el-form-item>
        </el-form> -->

        <el-row class="row" v-if="poll.sendMail">
            邮件收件人:
            <!-- <span style="color: red">(请成员在个人设置里设置邮箱信息)</span><br>&nbsp; -->
        </el-row>
        <el-row class="row box-shadow" style="max-height:300px;overflow-y: auto;"  v-if="poll.sendMail">
            <el-table :data="arrUser" border style="width: 100%" @selection-change="handleSelectionChange" ref="user" >
                <el-table-column type="selection" style="width: 20%">
                </el-table-column>
                <el-table-column label="成员" style="width: 80%;vertical-align: middle">
                    <template scope="scope">
                        <el-row class="row" style="height: 36px;line-height: 36px">
                            <el-col class="col" :span="4">
                                <!-- <img v-proxy="scope.row.photo" style="border-radius: 15px;margin-top: 5px"  width="30" height="30"> -->
                               <i class="fa fa-user-circle" aria-hidden="true" style="font-size:18px;color: #17B9E6;"></i>
                            </el-col>
                            <el-col class="col" :span="10">
                                <span style="margin-left: 10px">{{ scope.row.name }}</span>
                            </el-col>
                            <el-col class="col" :span="10">
                                <span style="margin-left: 10px">{{ scope.row.email }}</span>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="row" style="height: 20px">
        </el-row>
        <el-row class="dialog-footer" slot="footer">
            立即执行一次:
            <el-switch v-model="immediate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（是），红色（否）">
                <i class="el-icon-info" style="font-size: 12px;"></i>
            </el-tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <el-button size="mini" type="danger" @click="remove" :loading="removePending" v-if="propPoll && collectionEditable==false">
                删除定时任务
            </el-button> -->
            <el-button size="mini" type="primary" @click="save" :loading="savePending">
                保存
            </el-button>
        </el-row>
    </el-dialog>
</template>

<style scoped>
     .line-36{
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        /* text-align: center; */
        }
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;height: 66%;
    }
    #form-info .el-form-item__label {
        padding-bottom: 0px;
        height: 30px;
    }
    #form-info  .el-form-item {
        margin-bottom: 0;
    }

    .el-form-item{
        margin-bottom: 10px;
    }
    .el-form-item__label{
        padding:4px 14px;
    }
    .el-cascader--mini{
        width: 90%;
    }
    th,td{
        padding: 2px 0;
    }
    tr.el-table__row>th,
    tr.el-table__row>td{
        padding: 2px 0;
    }
    .el-table td, .el-table th{
        padding: 2px 0;
    }
    
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;height: 66%;
    }
</style>

<script>
    
    module.exports={
        props:["propPoll","propUser","collectionOfTest","collectionId","testProjectId","collectionEditable"],
        data:function () {
            return {
                selConllectionProject:[this.testProjectId,this.collectionId],
                props:{
                    value:"_id",
                    label:"name",
                    children:"data"
                },
                poll:function () {
                    if(this.propPoll)
                    {
                        return this.propPoll
                    }
                    else
                    {
                        return {
                            name:"",
                            date:[],
                            time:[],
                            time2:[],
                            failSend:0,
                            enabled:1,
                            sendMail:1
                        }
                    }
                }.call(this),
                arrUser:this.propUser,
                multipleSelection: [],
                savePending:false,
                removePending:false,
                showDialog:false,
                immediate:false
            }
        },
        directives:{
            
        },
        computed:{
            testCollectionArr:function(){
                var collectionOfTest=this.collectionOfTest.map(function (obj) {
                    
                    var collectionList=obj.data.map(function (collection) {
                        return {
                            label:collection.name,
                            value:collection._id
                        }  
                    });

                    var projObj={
                                    label:obj.name,
                                    value:obj._id,
                                    children:collectionList,
                                }

                    return projObj
                });
                // console.log('testCollectionArr:')
                // console.log(collectionOfTest)
                return collectionOfTest
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val.map(function (obj) {
                    return obj._id
                });
            },
            changeCollection:function (val) {
                // console.log('testpoll>component>poll.vue')
                // console.log(val)
                // console.log(this.testProjectId)
                // console.log(this.collectionId)
                // var collectionid=val[val.length-1];
                // console.log("collectionid:"+collectionid)
            },
            save:function () {
               var collectionSel=this.selConllectionProject;
                if(collectionSel.length==0)
                {
                    $.tip("请选择测试集合",0);
                    return;
                }
                if(!this.poll.name)
                {
                   
                    $.tip("请输入任务主题",0);
                    return;
                }

                if(this.poll.enabled)
                {
                    if(this.poll.time.length==0 && this.poll.time2.length==0)
                    {
                        $.tip("请选择时刻",0);
                        return;
                    }
                    if(this.poll.date.length==0)
                    {
                        $.tip("请选择星期",0);
                        return;
                    }
                }

                var arrUser=this.multipleSelection;
                if(this.poll.sendMail)
                {
                    if(arrUser.length==0)
                    {
                        $.tip("请选择邮件接收用户",0);
                        return;
                    }
                }
                
                
                console.log("collectionSel:")
                console.log(collectionSel)
                console.log("this.collectionId:")
                console.log(this.collectionId)

                this.savePending=true;
                var _this=this;
                var query={
                    name:_this.poll.name,
                    testproject:collectionSel[0],
                    collection:collectionSel[1],
                    interproject:this.poll.interProject?this.poll.interProject:"",

                    users:JSON.stringify(arrUser),
                    date:JSON.stringify(this.poll.date),
                    time:JSON.stringify(this.poll.time),
                    time2:JSON.stringify(this.poll.time2),
                    
                    immediate:this.immediate?1:0,
                    // phoneinfo:JSON.stringify(this.poll.phoneInfo),
                    failsend:Number(this.poll.failSend),
                    enabled:Number(this.poll.enabled),
                    sendMail:Number(this.poll.sendMail),
                    operator:session.get("name"),
                    owner:this.poll.owner?this.poll.owner:""
                };
                if(this.poll._id)
                {
                    query.id=this.poll._id;
                    query.originCollection=_this.collectionId
                }
                else
                {
                    query.owner=session.get("id");
                }
                net.post("/poll/save",query).then(function (data) {
                    _this.savePending=false;
                    if(data.code==200)
                    {
                        $.notify("保存成功",1);
                        _this.showDialog=false;
                        _this.$emit("save",data.data._id);
                        //  if(_this.poll._id)
                        // {
                        //     _this.$emit("save",{data:data.data,isnew:0});
                        // }
                        // else
                        // {
                        //     _this.$emit("save",{data:data.data,isnew:1});
                        // }
                        
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            },
            remove:function () {
                var _this=this;
                $.confirm("是否确认删除该定时任务",function () {
                    _this.removePending=true;
                    net.delete("/poll/item",{
                        id:_this.poll._id
                    }).then(function (data) {
                        _this.removePending=false;
                        if(data.code==200)
                        {
                            $.notify("删除成功",1);
                            _this.showDialog=false;
                            _this.$emit("remove")
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
            addParam:function () {
                this.poll.phoneInfo.param.push({
                    key:"",
                    value:""
                })
            },
            removeParam:function (item,index) {
                if(index==0)
                {
                    this.poll.phoneInfo.param[0]={
                        key:"",
                        value:""
                    }
                }
                else
                {
                    this.poll.phoneInfo.param.splice(index,1)
                }
            },
            changeBaseUrl:function () {
                var id;
                for(var i=0;i<this.arrProjectUrl.length;i++)
                {
                    var bFind=false;
                    for(var j=0;j<this.arrProjectUrl[i].data.length;j++)
                    {
                        if(this.arrProjectUrl[i].data[j].name==this.arrSelBaseUrl[1])
                        {
                            id=this.arrProjectUrl[i]._id;
                            bFind=true;
                            break;
                        }
                    }
                    if(bFind)
                    {
                        break;
                    }
                }
                this.poll.baseUrl=this.arrSelBaseUrl[1];
                this.poll.interProject=id;
            }
        },
        created:function () {
            if(this.propPoll)
            {
                var _this=this;
                this.propPoll.users.forEach(function (obj) {
                    _this.arrUser.forEach(function (obj1) {
                        if(obj1._id==obj._id)
                        {
                            _this.$nextTick(function () {
                                _this.$refs.user.toggleRowSelection(obj1,true);
                            })
                        }
                    })
                })
            }


        }
    }
</script>