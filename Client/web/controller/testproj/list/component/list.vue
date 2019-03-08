<template>
    <el-row class="row box-shadow">
        <template v-if="bEmpty">
		
            <el-row class="row" style="text-align: center;margin-top: 100px;color: gray;height: calc(100vh - 210px);">
                <i class="fa fa-list-alt" style="font-size: 60px"></i>
				<br><br>
                <span style="font-size: 14px">{{session.teamId?"当前团队下您":""}}
				还没有项目，点击下方按钮新增项目
				</span>
				<br><br>
                
                <template>
                    <el-dropdown v-if="session.teamId">
                        <el-button type="primary" size="small" style="margin-left: 20px;">
                            <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="showAdd=true">新项目</el-dropdown-item>
                            <el-dropdown-item @click.native="addExistProject">已有项目</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" size="small" style="margin-left: 20px;" @click="showAdd=true" v-else>
                        <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
                    </el-button>
                </template>
            </el-row>
        </template>
		
        <tempalte v-else>
            <el-row class="row" style="height: 50px;line-height: 50px;padding-right: 20px">
                
                <template>
                    <el-dropdown  v-if="session.teamId">
                        <el-button type="primary" size="small" style="margin-left: 20px;">
                            <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="showAdd=true">新项目</el-dropdown-item>
                            <el-dropdown-item @click.native="addExistProject">已有项目</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" size="small" style="margin-left: 20px;" @click="showAdd=true" v-else>
                        <i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
                    </el-button>
                </template>
                <el-button size="small" type="text" style="float: right;margin-right: 10px;margin-top: 15px;color: gray">
                    <div style="display: inline-block;height: 10px;width: 10px;border-radius: 5px;background-color: #67C23A;"></div>&nbsp;观察者
                </el-button>
                <el-button size="small" type="text" style="float: right;margin-right: 10px;margin-top: 15px;color: gray">
                    <div style="display: inline-block;height: 10px;width: 10px;border-radius: 5px;background-color: #17b9e6;"></div>&nbsp;管理员
                </el-button>
            </el-row>
            <el-row class="row" id="project_list_content" style="">
                <template v-if="!session.teamId">
                    <expand :expand="1" style="background-color: white;border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);" v-if="projectList.length>0">
                        <div slot="title" style="font-size: 14px">
                            项目列表
                        </div>
                        <el-radio-group v-model="projectSort" size="mini" slot="append" style="margin-right: 20px" @change="changeProjectSort">
                            <el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
                            <el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
                        </el-radio-group>
                        <el-row class="row">
                            <list :projectList="projectList"></list>
                        </el-row>
                    </expand>
					<!--
					<expand :expand="1" style="background-color: white;border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);" v-if="arrCreate.length>0">
                        <div slot="title" style="font-size: 14px">
                            我创建的项目
                        </div>
                        <el-radio-group v-model="createSort" size="mini" slot="append" style="margin-right: 20px" @change="changeCreateSort">
                            <el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
                            <el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
                        </el-radio-group>
                        <el-row class="row">
                            <list type="create" ref="createList" key="create" :category="type"></list>
                        </el-row>
                    </expand>
                    <expand :expand="1" style="background-color: white;margin-top: 20px;border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);" v-if="arrJoin.length>0">
                        <div slot="title" style="font-size: 14px">
                            我加入的项目
                        </div>
                        <el-radio-group v-model="joinSort" size="mini" slot="append" style="margin-right: 20px" @change="changeJoinSort">
                            <el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
                            <el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
                        </el-radio-group>
                        <el-row class="row">
                            <list type="join" ref="joinList" key="join" :category="type"></list>
                        </el-row>
                    </expand>
                    <expand :expand="1" style="background-color: white;margin-top: 20px;border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);" v-if="arrPublic.length>0">
                        <div slot="title" style="font-size: 14px">
                            公开的项目
                        </div>
                        <el-radio-group v-model="publicSort" size="mini" slot="append" style="margin-right: 20px" @change="changePublicSort">
                            <el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
                            <el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
                        </el-radio-group>
                        <el-row class="row">
                            <list type="public" ref="publicList" key="public" :category="type"></list>
                        </el-row>
                    </expand>
					-->
                </template>
                <expand :expand="1" style="background-color: white;border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);" v-else>
                    <div slot="title" style="font-size: 14px">
                        团队中的项目
                    </div>
                    <el-radio-group v-model="teamSort" size="mini" slot="append" style="margin-right: 20px" @change="changeTeamSort">
                        <el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
                        <el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
                    </el-radio-group>
                    <el-row class="row">
                        <list type="team" ref="teamList" key="team" :category="type"></list>
                    </el-row>
                </expand>
            </el-row>
        </tempalte>
		
        <el-dialog title="新建项目" :visible.sync="showAdd" width="50%" append-to-body>
            <el-form label-position="top" ref="form" label-width="100px">
                <el-form-item label="名称">
                    <el-input  style="width: 100%"  v-model="name" placeholder="请输入新项目的名称"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :rows="2"  style="width: 100%"  v-model="dis" placeholder="请输入新项目的简介"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showAdd = false">取 消</el-button>
            <el-button type="primary" @click="addProject" :loading="addPending">确 定</el-button>
        </span>
        </el-dialog>
    </el-row>
</template>
<style>
   #project_list_content{
       /* margin: 10px 20px 10px 20px; */
	   margin: 5px;
		padding: 5px;
       width: calc(100% - 40px);
       min-height: 500px;
       height: calc(100vh - 144px);
       overflow-y: auto;
       background-color: #ffffff;
       /* box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0px;
       box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24); */
   }
   .box-shadow{
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
    }
</style>
<script>
    var sessionChange=require("common/mixins/session");
    var expand=require("component/expand.vue");
    var list=require("./item.vue");

    module.exports={
        
        data:function () {
            return {
                showAdd:false,
                name:"",
                dis:"",
                addPending:false,
            }
        },
        mixins:[sessionChange],
        watch:{

        },
        components:{
            "expand":expand,
            "list":list
        },
        computed:{
			projectList:function () {
				return this.$store.state.testProjectList;
            },
			projectSort:{
                get:function () {
                    
                        return this.$store.state.testProjectSort;
                    
                },
                set:function (val) {
                    
                        this.$store.state.testProjectSort=val;
                    
                }
            },
            createSort:{
                get:function () {
                    
                        return this.$store.state.testCreateSort;
                    
                },
                set:function (val) {
                    
                        this.$store.state.testCreateSort=val;
                    
                }
            },
            joinSort:{
                get:function () {
                    
                        return this.$store.state.testJoinSort;
                    
                },
                set:function (val) {
                    
                        this.$store.state.testJoinSort=val;
                    
                }
            },
            publicSort:{
                get:function () {
                    
                        return this.$store.state.testPublicSort;
                    
                },
                set:function (val) {
                    
                        this.$store.state.testPublicSort=val;
                    
                }
            },
            teamSort:{
                get:function () {
                    
                        return this.$store.state.testTeamSort;
                    
                },
                set:function (val) {
                    
                        this.$store.state.testTeamSort=val;
                    
                }
            },
            bEmpty:function () {
				console.log("testproj>list>component>list>bEmpty>this.$store.state.testProjectList");
				console.log(this.$store.state.testProjectList);
				if(this.$store.state.testProjectList.length==0)
				{
					return true;
				}
				else
				{
					return false;
				}
						
				/*
                if(this.session.teamId)
                {
                    
                        if(this.$store.state.testTeamList.length==0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    
                }
                else
                {
                    
                        if(this.$store.state.testCreateList.length==0 && this.$store.state.testJoinList.length==0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    
                }*/
            },
            arrCreate:function () {
                
                    return this.$store.state.testCreateList
                
            },
            arrJoin:function () {
                
                    return this.$store.state.testJoinList
                
            },
            arrPublic:function () {
                
                    return [];
                
            }
        },
        methods:{
			changeProjectSort:function () {
                //this.$refs.createList.changeSort();
				var sortType,list;
				
				sortType=this.$store.state.testProjectSort;
				list=this.$store.state.testProjectList;
				

				if(sortType==0)
				{
					list.sort(function (obj1,obj2) {
						if(obj1.createdAt>obj2.createdAt)
						{
							return -1;
						}
						else if(obj1.createdAt<obj2.createdAt)
						{
							return 1;
						}
						else
						{
							return 0;
						}
					})
				}
				else
				{
					list.sort(function (obj1,obj2) {
						if(obj1.name.toLowerCase()<obj2.name.toLowerCase())
						{
							return -1;
						}
						else if(obj1.name.toLowerCase()>obj2.name.toLowerCase())
						{
							return 1;
						}
						else
						{
							return 0;
						}
					})
				}
			},
			
            changeCreateSort:function () {
                this.$refs.createList.changeSort();
            },
            changeJoinSort:function () {
                this.$refs.joinList.changeSort();
            },
            changePublicSort:function () {
                this.$refs.publicList.changeSort();
            },
            changeTeamSort:function () {
                this.$refs.teamList.changeSort();
            },
            addProject:function () {
                if(!this.name)
                {
                    this.$message.error("请输入名称");
                    return;
                }
                var _this=this;
                this.addPending=true;
                this.$store.dispatch("addProject",{
                    name:this.name,
                    dis:this.dis,
                    type:"test"
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

            addExistProject:function () {
                var _this=this;
                $.input("请输入已有项目的项目ID",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入项目ID",0);
                        return false
                    }
                    $.startHud();
                    var pro;
                    
                        pro=net.put("/team/pulltest",{
                            id:session.get("teamId"),
                            project:val.value
                        })
                    
                    pro.then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify("请求已发出，等待项目管理员响应",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            }
        }
    }
</script>