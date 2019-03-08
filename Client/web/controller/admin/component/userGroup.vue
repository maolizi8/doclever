<template>
    <el-row class="row" style="padding-bottom: 10px">
        <el-row class="row" style="text-align: center;height: 50px;line-height: 50px;font-size: 20px;border-radius: 5px;box-shadow: 0px 2px 2px #888888;background-color: white;">
            <el-col class="col" :span="8" style="border-right: 1px gray solid">
                总共:{{list.length}}
            </el-col>
        </el-row>

        <el-row class="row" style="text-align: center;border-radius: 5px;box-shadow: 0px 2px 2px #888888;background-color: white;margin-top: 20px">
            <el-row class="row" style="height: 50px;line-height: 50px;border-bottom:1px lightgray solid">
                <el-col class="col" :span="10">
                    <el-input size="small" style="width: 80%" placeholder="请输入你要查找的用户" v-model="user"></el-input>
                </el-col>
                <el-col class="col" :span="10">
                    <el-input size="small" style="width: 80%" placeholder="请输入你要查找的组" v-model="group"></el-input>
                </el-col>
                <el-col class="col" :span="2">
                    <el-button size="mini" type="primary" @click="search">查询</el-button>
                </el-col>
                <el-col class="col" :span="2">
                    <el-button size="mini" type="primary" @click="showAddGroup=true">新增</el-button>
                </el-col>
            </el-row>
            <table class="table-hover" style="width: 100%" v-if="list.length>0">
                <thead>
                    <th>
                        分组名
                    </th>
                    <th>
                        用户数
                    </th>
                    <th>
                        创建时间
                    </th>
                    <th>
                        最后更新
                    </th>
                    <th>
                        操作
                    </th>
                </thead>
                <tbody>
                    <template v-for="(item,index) in list" >
                        <tr style="text-align: center;vertical-align: middle" :key="item._id">
                            <td style="width: 12%">
                                {{item.name}}
                            </td>
                            <td style="width: 18%">
                                {{item.users.length}}
                            </td>
                            <td style="width: 18%">
                                {{item.createdAt}}
                            </td>
                            <td style="width: 10%">
                                {{item.updatedAt}}
                            </td>
                            <td style="width: 20%">
                                <el-button type="text" size="mini"  @click.native="edit(item,index)">
                                    编辑
                                </el-button>
                                <el-button type="text" size="mini"  @click.native="userManage(item,index)">
                                    用户管理
                                </el-button>
                                <el-button type="text" size="mini"  @click.native="remove(item,index)" style="color: red">
                                    删除
                                </el-button>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tfoot>
                <tr style="text-align: center;vertical-align: middle">
                    <td colspan="7">
                        <page @change="changePage" ref="page"></page>
                    </td>
                </tr>
                </tfoot>
            </table>
        </el-row>

        <el-dialog title="新建分组" :visible.sync="showAddGroup" width="50%" append-to-body>
            <el-form label-position="top" ref="form" label-width="100px">
                <el-form-item label="名称">
                    <el-input  style="width: 100%"  v-model.trim="name" placeholder="请输入分组的名称"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="2"  style="width: 100%"  v-model="dis" placeholder="请输入分组的简介"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showAddGroup = false">取 消</el-button>
            <el-button type="primary" @click="addGroup" :loading="addPending">确 定</el-button>
        </span>
        </el-dialog>
    </el-row>
</template>


<script>
    var page=require("component/page.vue");
    var proxyImg=require("director/proxyImg.js");
    var userProject=require("./userProject.vue");
    var userTeam=require("./userTeam.vue");
    module.exports={
        data:function () {
            return {
                list:[],
                
                type:0,
                user:"",
                group:"",

                showAddGroup:false,
                applyPending:false,
                name:"",
                dis:""
            }
        },
        computed:{

            // total:function () {
            //     return this.$store.state.userGroup.total;
            // },
            
            // list:function () {
            //     //return this.$store.state.userGroup.list;
            //     // var _this=this;
            //     // net.get("/admin/usergroup").then(function (data) {
            //     //     if(data.code==200)
            //     //     {
            //     //         _this.list=data.data;
            //     //     }
            //     // })//gql add
            // }
        },
        directives:{
            proxy:proxyImg
        },
        components:{
            "page":page
        },
        methods:{
            search:function () {
                var arr=[];
                var query={
                    name:this.group,
                    user:this.user
                }
                var _this=this;
                net.get("/admin/usergroup",query).then(function (data) {
                    if(data.code==200)
                    {
                        _this.list=data.data;
                    }else{
                          $.notify(data.msg,0)
                    }
                })//gql add
            },
            create:function () {
                $.showBox(this.$root,require("./userEdit.vue"));
            },
            addGroup:function () {
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
                    users:[]
                }
                net.post("/admin/saveusergroup",query).then(function (data) {
                    if(data.code==200)
                    {
                        _this.list.push(data.data)
                        $.notify("新增成功",1);
                        _this.showAddGroup=false;
                        _this.name="";
                        _this.dis="";
                    }else
                    {
                        $.notify(data.msg,0);
                        //_this.showAddGroup=false;
                    }
                })
                
            },
            edit:function (item,index) {
                var _this=this;
                $.startHud();
                net.get("/admin/userinfo",{
                    id:item._id
                }).then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        $.showBox(_this.$root,require("./userEdit.vue"),{
                            propObj:data.data
                        });
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            },
            remove:function (item,index) {
                var _this=this;
                $.confirm("是否删除改用户？",function () {
                    $.startHud();
                    _this.$store.dispatch("removeUser",{
                        id:item._id,
                        index:index
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("删除成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                })
            },
            changePage:function (page) {
                var query={
                    page:page,
                    type:this.type
                }
                if(this.user)
                {
                    query.key=this.user;
                }
                $.startHud();
                this.$store.dispatch("userList",query).then(function (data) {
                    $.stopHud();
                    if(data.code!=200)
                    {
                        $.notify(data.msg,0);
                    }
                });
            },
            userProject:function (item) {
                var _this=this;
                $.startHud();
                net.get("/admin/userprojectlist",{
                    id:item._id
                }).then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        $.showBox(_this.$root,userProject,{
                            propObj:data.data,
                            user:item
                        })
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            userManage:function (item) {
                var _this=this;
                $.startHud();
                net.get("/admin/userteamlist",{
                    id:item._id
                }).then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        var child=$.showBox(_this,require("./userGroupEdit.vue"),{
                                userArr:data.data
                            });
                            child.$on("save",function (obj) {
                                console.log(obj)
                            })
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            }
        },
        created:function () {
            console.log('userGroup.vue>created:')
            var _this=this;
            net.get("/admin/usergroup").then(function (result) {
                
                if(result.code==200)
                {
                    _this.list=result.data;
                }
                else
                {
                    throw result.msg;
                }
                console.log(_this.list)
                $.stopLoading();
            }).catch(function (err) {
                $.stopLoading();
                if(typeof(err)=="string")
                {
                    $.notify(err,0);
                }
                else
                {
                    $.notify("获取失败",0);
                }
            })
        }
    }
</script>