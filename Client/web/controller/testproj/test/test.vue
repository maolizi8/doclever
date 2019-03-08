<template>
    <transition name="component-fade" mode="out-in">
		<el-col class="col" style="" id="showContent">
					  
			<el-row class="row" style="margin-top: 10px;font-size: 14px" id="test">
				<!-- <switchproject :testid="testid" style="position: absolute;top: 5px;right: 10px;z-index: 1000;font-size: 14px">
				</switchproject> 
				 v-if="!shareRole"
				-->
                <switchproject :projtype="projtype" :projectid="testid" style="position: absolute;top: 5px;right: 10px;z-index: 1000;font-size: 14px">
				
                </switchproject>
				
				<el-tabs v-model="type" style="height: 50px;">
					<el-tab-pane name="edit" label="编辑">
						<edit :testid="testid"></edit>
					</el-tab-pane>
					<el-tab-pane name="setting" label="设置">
						<setting :testid="testid"></setting>
					</el-tab-pane>
				</el-tabs>
			</el-row>
		</el-col>
   </transition>
    
</template>

<style>
    #test .el-tabs__header {
        background-color: white;
    }
    #test .el-tabs__nav-scroll {
        padding-left: 20px;
        padding-right: 20px;
    }
    #test .el-tabs__header {
        margin-bottom: 5px;
    }
</style>

<script>

    //var store=require("./store")._modulesNamespaceMap["testproj/test/"].context;
    var store=require("../store")._modulesNamespaceMap["test/"].context;

    var sessionChange=require("common/mixins/session");
    
    
    
    var switchProject=require("component/switchProject.vue");
    //var switchProject=require("./component/switchProject.vue");
    
    var expand=require("component/expand.vue")
    //var expand=require("./component/expand.vue")

    var edit=require("./component/edit.vue")
    var setting=require("./component/setting.vue")
	
    module.exports = {
        //props:["testid"],
        data: function () {
            return {
                projtype:"test",
                type:"edit",
                //testid:this.testid,
            }
        },
        store:store,
        //mixins:[sessionChange,refresh],
		mixins:[sessionChange],
        components:{
            "switchproject":switchProject,
            "expand":expand,
            "edit":edit,
            "setting":setting
        },
        computed:{
            testid:function(){
				console.log('testproj>test>test.vue>testid')
				console.log(this.$store.getters.testid)
				return this.$store.getters.testid;
			},
        },
        methods: {
            
        }
    }
</script>