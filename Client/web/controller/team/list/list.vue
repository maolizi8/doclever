<template>
    <el-col class="col right_side" style="">
        <el-row class="row right_head" style="">
            <el-col class="col" :span="18" style="font-size: 15px;font-weight: bold;color:#17B9E6 ">
               接口项目管理 - 列表
            </el-col>
            <userSession></userSession>
            
        </el-row>
        <el-row style="" class="right_content">
            <el-col class="col" style="" id="showContent">
                    <el-row class="row">
                        <transition name="component-fade" mode="out-in">
                            <el-row class="row">
                                <template v-if="bEmpty">
                                    <el-row class="row" style="text-align: center;margin-top: 100px;color: gray">
                                        <i class="fa fa-list-alt" style="font-size: 60px"></i><br><br>
                                        <span style="font-size: 14px">还没有团队，点击下方按钮新增或者导入团队</span><br><br>
                                        <el-button type="primary" size="small" @click="showAdd=true">
                                            <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增团队
                                        </el-button>
                                        
                                    </el-row>
                                </template>
                                <tempalte v-else>
                                    <el-row class="row" style="height: 50px;line-height: 50px;padding-right: 20px">
                                        <el-button type="primary" size="small" style="margin-left: 20px;" @click="showAdd=true">
                                            <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增团队
                                        </el-button>
                                        
                                        <el-button type="primary" size="small" style="margin-left: 20px;" @click="showAddProject=true">
                                            <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
                                        </el-button>
                                        <el-button size="small" style="margin-left: 10px;" @click="importProject">
                                            <strong><i class="el-icon-download" style="font-weight:900"></i>
                                            </strong>&nbsp;导入项目
                                        </el-button>

                                        <el-button size="mini" type="text" style="font-size: 13px;" onclick="window.open('/html/web/views/helper.html','_blank')">
                                            接口录入教程
                                        </el-button>



                                        <el-button size="small" type="text" style="float: right;margin-right: 10px;margin-top: 15px;color: gray">
                                            <div style="display: inline-block;height: 10px;width: 10px;border-radius: 5px;background-color: #67C23A;"></div>&nbsp;观察者
                                        </el-button>
                                        <el-button size="small" type="text" style="float: right;margin-right: 10px;margin-top: 15px;color: gray">
                                            <div style="display: inline-block;height: 10px;width: 10px;border-radius: 5px;background-color: #17b9e6;"></div>&nbsp;管理员
                                        </el-button>



                                    </el-row>

                                    <el-row class="row" style="margin: 10px 20px 10px 20px;width: calc(100% - 40px);height: calc(100vh - 120px);overflow-y: auto">
                                        <tempalte v-for="(team,index) in teamProject" :key="index">
                                            <expand :expand="1" class="expand_head">
                                                <div slot="title" style="font-size: 14px;">
                                                    {{team.name}}（{{team.data.length}}）
                                                </div>
                                                <el-row class="row">
                                                    <list :teamid="team._id" :teamname="team.name" :projectlist="team.data"></list>
                                                </el-row>
                                            </expand>
                                        </tempalte>
                                        
                                        
                                    </el-row>

                                </tempalte>

                                <el-dialog title="新建团队" :visible.sync="showAdd" width="50%" append-to-body>
                                    <el-form label-position="top" ref="form" label-width="100px">
                                        <el-form-item label="名称">
                                            <el-input size="small" style="width: 100%"  v-model.trim="name" placeholder="请输入新团队的名称"></el-input>
                                        </el-form-item>
                                        <el-form-item label="描述">
                                            <el-input size="small" type="textarea" :rows="2"  style="width: 100%"  v-model="dis" placeholder="请输入新团队的简介"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <span slot="footer" class="dialog-footer">
                                    <el-button @click="showAdd = false">取 消</el-button>
                                    <el-button type="primary" @click="addTeam" :loading="addPending">确 定</el-button>
                                </span>
                                </el-dialog>

                                <el-dialog title="新建项目" :visible.sync="showAddProject" width="50%" append-to-body>
                                    <el-form label-position="top" ref="form" label-width="100px">
                                        <el-form-item label="选择团队">
                                            <el-select id="teamid" v-model="projTeamId">
                                                <el-option v-for="(item,index) in teamList"  :value="item._id" :label="item.name" :key="index" ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="名称">
                                            <el-input  style="width: 100%"  v-model.trim="name" placeholder="请输入新项目的名称"></el-input>
                                        </el-form-item>
                                        <el-form-item label="描述">
                                            <el-input type="textarea" :rows="2"  style="width: 100%"  v-model="dis" placeholder="请输入新项目的简介"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <span slot="footer" class="dialog-footer">
                                    <el-button @click="showAddProject = false">取 消</el-button>
                                    <el-button type="primary" @click="addProject" :loading="addPending">确 定</el-button>
                                </span>
                                </el-dialog>
                                
                            </el-row>
                        </transition>
                    </el-row>
            </el-col>
        </el-row>
    </el-col>

    
</template>

<style scoped>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
    .expand_head{
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
</style>

<script>

    //var store=require("../../store")._modulesNamespaceMap["team/list/"].context;
    var store=require("../store")._modulesNamespaceMap["list/"].context;
    var sessionChange=require("common/mixins/session");
    var refresh=require("common/mixins/refresh");
    var expand=require("component/expand.vue")
    var userSession=require("component/userSession.vue")

    var list=require("./component/item.vue")
    var importProject=require("./component/import.vue")
    
    module.exports = {
        data: function () {
            return {
                projTeamId:"",

                type:"interface",
                showAddProject:false,

                showAdd:false,
                name:"",
                dis:"",
                addPending:false,
                showApply:false,
                applyPending:false,
                applyName:"",
                applyDis:""
            }
        },
        mixins:[sessionChange,refresh],
        store:store,
        components:{
            "userSession":userSession,

            "list":list,
            "expand":expand
        },
        computed:{
            bEmpty:function () {
                //if(store.state.teamCreateList.length==0 && store.state.teamJoinList.length==0)
                if(store.state.teamProjectList.length==0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            },

            teamList:function () {
                return store.state.teamList
            },
            
            teamListOptions:function () {
                var arr=store.state.teamList;
                var arrGroup=[];
                (function _map(arr,arrGroup) {
                    for(var i=0;i<arr.length;i++)
                    {
                        var obj=arr[i];
                        if(obj)
                        {
                            var obj1={
                                value:obj._id,
                                label:obj.name,
                            };
                            arrGroup.push(obj1);
                        }
                    }
                })(arr,arrGroup);
                return arrGroup;
            },

            teamProject:function () {
                return store.state.teamProjectList
            },//geqiuli add



            arrCreate:function () {
                return store.state.teamCreateList
            },
            arrJoin:function () {
                return store.state.teamJoinList
            }
        },
        methods: {
            changeCreateSort:function () {
                this.$refs.createList.changeSort();
            },
            changeJoinSort:function () {
                this.$refs.joinList.changeSort();
            },
            addTeam:function () {
                if(!this.name)
                {
                    this.$message.error("请输入名称");
                    return;
                }
                var _this=this;
                this.addPending=true;
                store.dispatch("addTeam",{
                    name:this.name,
                    dis:this.dis
                }).then(function (data) {
                    _this.addPending=false;
                    _this.name="";
                    _this.dis=""
                    if(data.code==200)
                    {
                        $.notify("创建成功",1);
                        _this.showAdd=false;
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            applyTeam:function () {
                if(!this.applyName)
                {
                    $.tip("请输入团队ID",0);
                    return;
                }
                this.applyPending=true;
                var _this=this;
                net.put("/team/userapply",{
                    id:this.applyName,
                    dis:this.applyDis
                }).then(function (data) {
                    _this.applyPending=false;
                    _this.applyName="";
                    _this.applyDis=""
                    if(data.code==200)
                    {
                        $.notify("请求已发送，等待团队管理员响应",1);
                        _this.showApply=false;
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            

            addProject:function () {
                if(!this.name)
                {
                    this.$message.error("请输入名称");
                    return;
                }
                var _this=this;
                this.addPending=true;
                var query={
                    name:this.name,
                    dis:this.dis,
                    type:"interface",
                    team:this.projTeamId
                    //type:this.type
                }
                
                this.$store.dispatch("addProject",query).then(function (data) {
                    _this.addPending=false;
                    _this.name="";
                    _this.dis="";
                    _this.projTeamId="";

                    if(data.code==200)
                    {
                        $.notify("创建成功",1);
                        _this.showAddProject=false;
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            importProject:function () {
                $.showBox(this,importProject)
            },
        }
    }
</script>