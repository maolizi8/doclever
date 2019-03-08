<template>
    <transition name="component-fade" mode="out-in">
		<el-col class="col" style="" id="showContent">
			<el-row class="row" style="margin-top: 10px;background-color: white;padding: 10px;" id="list">
				
				<el-row class="row box-shadow">
					<template v-if="bEmpty">
					
						<el-row class="row" style="text-align: center;margin-top: 100px;color: gray;height: calc(100vh - 210px);">
							<i class="fa fa-list-alt" style="font-size: 60px"></i>
							<br><br>
							<span style="font-size: 14px">
							还没有项目，点击下方按钮新增项目
							</span>
							<br><br>
							
							<template>
								<el-button type="primary" size="small" style="margin-left: 20px;" @click="showAdd=true">
									<i class="el-icon-plus" style="font-weight:900"></i>&nbsp;新增项目
								</el-button>
							</template>
						</el-row>
					</template>
					
					<tempalte v-else>
						<el-row class="row" style="height: 50px;line-height: 50px;padding-right: 20px">
							<template>
								<el-button type="primary" size="small" style="margin-left: 20px;" @click="showAdd=true">
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
							<template>
								<expand :expand="1" style="background-color: white;border-radius: 5px;box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);" v-if="projectList.length>0">
									<div slot="title" style="font-size: 14px">
										项目列表
									</div>
									<el-radio-group v-model="projectSort" size="mini" slot="append" style="margin-right: 20px" @change="changeProjectSort">
										<el-radio-button :label="0">时间&nbsp;↓</el-radio-button>
										<el-radio-button :label="1">名称&nbsp;↑</el-radio-button>
									</el-radio-group>
									<el-row class="row">
										<items :projectList="projectList"></items>
									</el-row>
								</expand>
							</template>
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
				
			</el-row>
		</el-col>
		
   </transition>
	
</template>

<style>
    #list .el-tabs__header {
        background-color: white;
    }
    #list .el-tabs__nav-scroll {
        padding-left: 20px;
        padding-right: 20px;
    }
    #list .el-tabs__header {
        margin-bottom: 5px;
    }
	#project_list_content{
       /* margin: 10px 20px 10px 20px;
       height: calc(100vh - 144px); */
	   margin: 5px;
		padding: 5px;
       width: calc(100% - 40px);
       min-height: 500px;
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

    var store=require("../store")._modulesNamespaceMap["list/"].context;
    var sessionChange=require("common/mixins/session");
	
    var expand=require("component/expand.vue");
    //var list=require("./component/list.vue");
    var items=require("./component/item.vue");

    module.exports = {
        data: function () {
            return {
				showAdd:false,
                name:"",
                dis:"",
                addPending:false,
				type:"test"
			}
        },
        store:store,
        //mixins:[sessionChange,refresh],
		mixins:[sessionChange],
        components:{
            
			"expand":expand,
            "items":items
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
			bEmpty:function () {
				console.log("testproj>list>bEmpty>this.$store.state.testProjectList");
				console.log(this.$store.state.testProjectList);
				if(this.$store.state.testProjectList.length==0)
				{
					return true;
				}
				else
				{
					return false;
				}
            },
		},
        methods: {
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
        }
    }
</script>