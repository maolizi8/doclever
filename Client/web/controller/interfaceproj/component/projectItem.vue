<template>
    <div style="width: 100%;">
        <table style="background-color: transparent;width: 100%;height: 100%" v-if="arr.length>0">
            <tbody>
                <tr v-for="n in arrLength" :key="n">
                    <td v-for="index in 5" style="padding: 10px;width: 20%;height: 120px" :key="index">
                        <el-row v-if="arr[(n-1)*5+(index-1)]" :style="{borderRadius:'5px',color:'gray'}" class="projbox" @click.native="changeToInterface(arr[(n-1)*5+(index-1)])">
                            <el-row class="row" style="height: 65px;">
                                <div type="primary" size="small" style="width: 26px;height: 26px;line-height:26px;border-radius: 13px;display: inline-block;color:white;margin-top: 15px;font-size: 14px" :style="{backgroundColor:color(arr[(n-1)*5+(index-1)])}">
                                    接
                                </div>
                                <div style="font-size: 14px;color: black;display: table;table-layout: fixed;width: 100%;margin-top: 5px">
                                    <div style="display: table-cell;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">
                                        {{arr[(n-1)*5+(index-1)].name}}
                                    </div>
                                </div>
                            </el-row>
                            <el-row class="row" style="height: 30px;line-height: 30px;font-size: 13px;display: table;table-layout: fixed;">
                                <div style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display: table-cell;height: 25px">
                                    {{arr[(n-1)*5+(index-1)].dis?arr[(n-1)*5+(index-1)].dis:"&nbsp;"}}
                                </div>
                            </el-row>
                            <el-row class="row" style="height: 25px;line-height:25px;font-size: 12px;color: #b9b9b9;border-top: 1px lightgray solid;background-color: rgb(245,246,249)">
                                <el-col class="col" :span="12" style="border-right: 1px lightgray solid;">
                                    {{"成员:"+arr[(n-1)*5+(index-1)].userCount}}
                                </el-col>
                                <el-col class="col" :span="12">
                                    {{"接口:"+arr[(n-1)*5+(index-1)].interfaceCount}}
                                </el-col>
                            </el-row>
                            <el-dropdown style="position: absolute;right: 5px;top: 0px;" v-if="arr[(n-1)*5+(index-1)].own || arr[(n-1)*5+(index-1)].role==0 ">
                                <el-button type="text" size="mini" icon="el-icon-setting" class="el-dropdown-link" style="font-size: 15px;color: #17b9e6" @click.stop="">
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="user(arr[(n-1)*5+(index-1)])">成员管理</el-dropdown-item>
                                    <el-dropdown-item v-if="teamid" @click.native="quit(arr[(n-1)*5+(index-1)],(n-1)*5+(index-1))">踢出团队</el-dropdown-item>
                                    <!-- <el-dropdown-item @click.native="remove(arr[(n-1)*5+(index-1)],(n-1)*5+(index-1))">删除项目</el-dropdown-item> -->
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-row>
                    </td>
                </tr>
            </tbody>
        </table>
        <template v-else>
            <el-row class="row" style="text-align: center;margin-top: 100px;color: gray">
                <i class="fa fa-list-alt" style="font-size: 60px"></i><br><br>
                <span style="font-size: 14px">{{session.teamId?"当前团队下您":""}}还没有项目，点击上方方按钮新增或者导入项目</span><br><br>
                
            </el-row>
        </template>
    </div>
</template>
<style scoped>
    .el-row::after, .el-row::before {
        display: none;
    }
    .projbox{
        text-align: center;
        height: 100%;cursor: pointer;
        border: 1px #cccccc solid;
    }
</style>
<script>
/**
 
<el-dropdown-item @click.native="transfer(arr[(n-1)*5+(index-1)],(n-1)*5+(index-1))">指定所有者</el-dropdown-item>
 */
    var sessionChange=require("common/mixins/session");
    //var mongoose=require('mongoose');   //geqiuli add

    module.exports={
        //props:["type","category","teamid","teamname"],
        props:["teamid"],
        data:function () {
            return {
                "teamid":this.teamid
            }
        },
        mixins:[sessionChange],
        computed:{
            arr:function () {
                return this.$store.state.projectList;
            },
            arrLength:function () {
                var val=this.arr.length/5;
                return Math.floor(val)===val?val:(Math.floor(val)+1)
            }
        },
        methods:{
            info:function (item) {
                    this.$store.dispatch("info",{
                        id:item._id,
                        name:item.name,
                        type:"interface"
                    })
                
            },
            changeSort:function () {
                // this.$store.commit("changeSort",{
                //     type:"interface",
                //     category:"interface"
                // });
            },

            changeToInterface(item){
                console.log(item._id)
                window.open("interface.html?interid="+item._id,'_self')
            },//geqiuli add

            color:function (item) {
                if(item.own)
                {
                    return "#17b9e6"
                }
                else
                {
                    if(item.role==0)
                    {
                        return "#17b9e6"
                    }
                    else
                    {
                        return "#67C23A";
                    }
                }
            },
            remove:function (item,index) {
                var _this=this;
                $.confirm("是否确认删除项目，该项目下一切数据都会删除",function () {
                    var loading=_this.$loading({fullscreen:true});
                    var pro;
                        pro=net.delete("/project/item",{
                            id:item._id
                        })
                    
                    pro.then(function (data) {
                        loading.close();
                        if(data.code==200)
                        {
                            $.notify("删除成功",1);
                                
                                var teamList=_this.$store.state.projectList;
								var teamid=_this.$store.state.teamid
								console.log("interfaceproj>projectItem.vue>remove from team>teamid")
                                console.log(teamid);
								teamList.splice(index, 1);
								
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
            quit:function (item,index) {
                var _this=this;
                $.confirm("是否踢出该项目，该项目下数据会被保留",function () {
                    var loading=_this.$loading({fullscreen:true});
                    var pro;
                        pro=net.delete("/team/project2",{
                            //id:this.teamid,
                            project:item._id
                        })
                   
                   
                    pro.then(function (data) {
                        loading.close();
                        if(data.code==200)
                        {
                            $.notify("踢出成功",1);
                                var teamList=_this.$store.state.projectList;
								var teamid=_this.$store.state.teamid
								console.log("interfaceproj>projectItem.vue>out of team>teamid")
                                console.log(teamid);
								teamList.splice(index, 1);
								
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
            user:function (item) {
                
                $.startHud();
                var _this=this;
                var pro;
                    pro=net.get("/team/projectuser2",{
                        project:item._id
                    })
                
                pro.then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        var child=$.showBox(_this,require("./teamProjectUser.vue"),{
                            arr:data.data,
                            id:item._id,
                            //type:_this.category
                            type:"interface"
                        });
                        child.$on("update",function (arr) {
                            item.userCount=arr.length+1;
                                arr.forEach(function (obj) {
                                    if(obj.user==session.get("id"))
                                    {
                                        item.role=obj.role;
                                    }
                                })
                            
                        })
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            transfer:function (item,index) {
                $.startHud();
                var _this=this;
                var pro;
                    pro=net.get("/team/projectuser2",{
                        project:item._id
                    })
                
               
                pro.then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        var child=$.showBox(_this,require("./projectTransfer.vue"),{
                            arr:data.data,
                            id:item._id,
                            type:"interface"
                        });
                        child.$on("userMinus",function () {
                            item.userCount--;
                        })
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            }
        }
    }
</script>
