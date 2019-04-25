<template>
    <el-row style="" class="right_content">
        <el-col class="col" style="" id="showContent">
           
                <transition name="component-fade" mode="out-in">
                    <el-row class="row">
                        <tempalte>
                            <el-row class="row" style="height: 50px;line-height: 50px;padding-right: 20px">
                                
                                <el-button type="primary" size="small" style="margin-left: 20px;float:left;" @click="showAddProject=true">
                                    <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
                                </el-button>
                                <el-button size="small" style="margin-left: 10px;float:left;" @click="importProject">
                                    <strong><i class="el-icon-download" style="font-weight:900"></i>
                                    </strong>&nbsp;导入项目
                                </el-button>

                                <el-button size="mini" type="text" style="font-size: 13px;float:left;" onclick="window.open('https://docs.qq.com/doc/DUWZReXpCcW9nUkdP','_blank')">
                                    接口录入教程
                                </el-button>
								<!--
								<el-radio-group v-model="projectSort" size="mini" slot="append" style="margin-right: 20px" @change="changeProjectSort">
									<el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
									<el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
								</el-radio-group>
								-->
                                <el-button size="small" type="text" style="float: right;margin-right: 10px;margin-top: 15px;color: gray">
                                    <div style="display: inline-block;height: 10px;width: 10px;border-radius: 5px;background-color: #67C23A;"></div>&nbsp;观察者
                                </el-button>
                                <el-button size="small" type="text" style="float: right;margin-right: 10px;margin-top: 15px;color: gray">
                                    <div style="display: inline-block;height: 10px;width: 10px;border-radius: 5px;background-color: #17b9e6;"></div>&nbsp;管理员
                                </el-button>
                                <!-- <el-button size="small" style="margin-right: 10px;float:right;" @click="manageTeamUsers" v-if="projTeamId">
                                    <strong><i class="el-icon-setting" style="font-weight:900"></i>
                                    </strong>&nbsp;用户管理
                                </el-button> -->
                            </el-row>

                            <el-row class="row" style="margin: 10px 20px 10px 20px;width: calc(100% - 40px);;overflow-y: auto">
                                <tempalte>
                                    <list :teamid="teamid"></list>
                                    
                                </tempalte>
                            </el-row>

                        </tempalte>

                        <el-dialog title="新建项目" :visible.sync="showAddProject" width="50%" append-to-body>
                            <el-form label-position="top" ref="form" label-width="100px">
                                <el-form-item label="选择团队">
                                    <el-select v-model="projTeamId"  style="width: 100%"  >
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
            
        </el-col>
    </el-row>
       
</template>

<style scoped>
    .el-row::after, .el-row::before {
        display: none;
    }
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
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
    }
</style>

<script>

    var sessionChange=require("common/mixins/session");

    var list=require("./projectItem.vue")
    var importProject=require("./import.vue")
    
    module.exports = {
        props:["teamid"],
        data: function () {
            return {
                projTeamId:this.teamid,

                type:"interface",
                showAddProject:false,
                //showAdd:false,
                name:"",
                dis:"",
                //addPending:false,
                showApply:false,
                applyPending:false,
                applyName:"",
                applyDis:""
            }
        },
        mixins:[sessionChange],
        components:{
            "list":list
        },
        computed:{
            teamList:function () {
                return this.$store.state.teamList
            },
            // teamid:function(){
            //      return this.$store.state.teamid
            // }
        },
        methods: {
            changeCreateSort:function () {
                this.$refs.createList.changeSort();
            },
            changeJoinSort:function () {
                this.$refs.joinList.changeSort();
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
                    //_this.projTeamId="";
					_this.projTeamId=_this.teamid;

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
            manageTeamUsers:function () {
                // $.startHud();
                // var _this=this;
                // var pro;
                //     pro=net.get("/team/projectuser2",{
                //         project:item._id
                //     })
                
                // pro.then(function (data) {
                //     $.stopHud();
                //     if(data.code==200)
                //     {
                //         var child=$.showBox(_this,require("./teamProjectUser.vue"),{
                //             arr:data.data,
                //             id:item._id,
                //             //type:_this.category
                //             type:"interface"
                //         });
                //         child.$on("update",function (arr) {
                //             item.userCount=arr.length+1;
                //                 arr.forEach(function (obj) {
                //                     if(obj.user==session.get("id"))
                //                     {
                //                         item.role=obj.role;
                //                     }
                //                 })
                            
                //         })
                //     }
                //     else
                //     {
                //         $.notify(data.msg,0);
                //     }
                // })
            },
        }
    }
</script>
