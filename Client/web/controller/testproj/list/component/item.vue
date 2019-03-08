<template>
    <div style="width: 100%;">
        <table style="background-color: transparent;width: 100%;height: 100%" v-if="arr.length>0">
            <tbody>
            <tr v-for="n in arrLength" :key="n">
                <td v-for="index in 5" style="padding: 10px;width: 20%;height: 120px" :key="index">
                    <el-row v-if="arr[(n-1)*5+(index-1)]" :style="{borderRadius:'5px',color:'gray'}" class="projbox" @click.native="changeToTestCase(arr[(n-1)*5+(index-1)])">
                        <el-row class="row" style="height: 65px;">
                            <div type="primary" size="small" style="width: 26px;height: 26px;line-height:26px;border-radius: 13px;display: inline-block;color:white;margin-top: 15px;font-size: 14px" :style="{backgroundColor:color(arr[(n-1)*5+(index-1)])}">
                                测
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
                                {{"用例:"+arr[(n-1)*5+(index-1)].testCount}}
                            </el-col>
                        </el-row>
						<!-- 
                        <el-dropdown style="position: absolute;right: 5px;top: 0px;" v-if="manageRole(arr[(n-1)*5+(index-1)])">
                            <el-button type="text" size="mini" icon="el-icon-setting" class="el-dropdown-link" style="font-size: 15px;color: #17b9e6" @click.stop="">
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="user(arr[(n-1)*5+(index-1)])">成员管理</el-dropdown-item>
                                <el-dropdown-item @click.native="quit(arr[(n-1)*5+(index-1)],(n-1)*5+(index-1))">踢出团队</el-dropdown-item>
                                <el-dropdown-item @click.native="remove(arr[(n-1)*5+(index-1)],(n-1)*5+(index-1))">删除项目</el-dropdown-item>
                                <el-dropdown-item @click.native="transfer(arr[(n-1)*5+(index-1)],(n-1)*5+(index-1))">转让管理权</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
						 -->
                    </el-row>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    .projbox{
        text-align: center;
        height: 100%;
        cursor: pointer;
        border: 1px #cccccc solid;
    }

    .el-row::after, .el-row::before {
        display: none;
    }
</style>
<script>
/*
line7: <el-row v-if="arr[(n-1)*5+(index-1)]" :style="{borderRadius:'5px',color:'gray'}" class="projbox" @click.native="info(arr[(n-1)*5+(index-1)])">
<el-button type="text" onclick="window.open('/html/web/resource/other/inject.html','_blank')">
                注入规则
            </el-button>
*/

    var sessionChange=require("common/mixins/session");
    module.exports={
        props:["type","category","projectList"],
        data:function () {
            return {

            }
        },
        mixins:[sessionChange],
        computed:{
            arr:function () {
				console.log('item.vue>arr projectList');
                console.log(this.projectList);
                return this.projectList;
            },
            arrLength:function () {
                var val=this.arr.length/5;
                return Math.floor(val)===val?val:(Math.floor(val)+1)
            }
        },
        methods:{
            manageRole:function (item) {
				console.log("testproj>list>component>item.vue>item")
				console.log(item)
				if(item.own){
					return true;
				}
				else{
					if(item.role==0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
				}
            },
            info:function (item) {
                
                    this.$store.dispatch("info",{
                        id:item._id,
                        name:item.name,
                        type:"test"
                    })
                
            },

            changeToTestCase(item){
                // onclick="window.open('/html/web/views/testcase.html?id='+arr[(n-1)*5+(index-1)]._id,'_blank')"
                console.log(item._id)
                //location.href="../../views/testcase.html?id="+item._id
                //location.href="html/web/controller/views/testcase.html?id="+item._id
                window.open("test.html?testid="+item._id,'_self')
            },//geqiuli add

            changeSort:function () {
                this.$store.commit("changeSort",{
                    type:"test",
                    category:"test"
                });
            },
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
                // console.log('item.vue>remove>item')
                // console.log(item)
                var confirm_msg="是否确认删除项目，该项目下的一切数据都会删除"
                $.confirm(confirm_msg,function () {
                    // console.log('item.vue>remove>confirm-item')
                    // console.log(item)
                    var loading=_this.$loading({fullscreen:true});
                    var pro;
                    
                        pro=net.delete("/test/project",{
                            project:item._id
                        })
                    
                    pro.then(function (data) {
                        loading.close();
                        if(data.code==200)
                        {
                            $.notify("删除成功",1);
                            
                                _this.$store.state.testTeamList.splice(index, 1);
                            
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
                    
                        pro=net.delete("/team/test",{
                            id:session.get("teamId"),
                            project:item._id
                        })
                    
                    pro.then(function (data) {
                        loading.close();
                        if(data.code==200)
                        {
                            $.notify("踢出成功",1);
                            
                                _this.$store.state.testTeamList.splice(index,1);
                            
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
                
                    pro=net.get("/team/testuser",{
                        id:session.get("teamId"),
                        project:item._id
                    })
                
                pro.then(function (data) {
                    // $.stopHud();
                    // if(data.code==200)
                    // {
                    //     var child=$.showBox(_this,require("../../../../console/team/info/component/teamProjectUser.vue"),{
                    //         arr:data.data,
                    //         id:item._id,
                    //         type:"test"
                    //     });
                    //     child.$on("update",function (arr) {
                    //         item.userCount=arr.length+1;
                    //         /*if(_this.category=="interface")
                    //         {
                    //             arr.forEach(function (obj) {
                    //                 if(obj.user==session.get("id"))
                    //                 {
                    //                     item.role=obj.role;
                    //                 }
                    //             })
                    //         }*/
                    //     })
                    // }
                    // else
                    // {
                    //     $.notify(data.msg,0);
                    // }
                })
            },
            transfer:function (item,index) {
                // $.startHud();
                // var _this=this;
                // var pro;
                
                //     pro=net.get("/team/testuser",{
                //         id:session.get("teamId"),
                //         project:item._id
                //     })
                
                // pro.then(function (data) {
                //     $.stopHud();
                //     if(data.code==200)
                //     {
                //         var child=$.showBox(_this,require("../../../../console/team/info/component/projectTransfer.vue"),{
                //             arr:data.data,
                //             id:item._id,
                //             type:"test"
                //         });
                //         child.$on("userMinus",function () {
                //             item.userCount--;
                //         })
                //     }
                //     else
                //     {
                //         $.notify(data.msg,0);
                //     }
                // })
            }
        }
    }
</script>
