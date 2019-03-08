<template>
	<transition name="component-fade" mode="out-in">
	
		<el-col class="col" style="" id="showContent">
			<el-row class="row" style="margin-top: 10px">
				<el-tabs v-model="type" style="height: 50px;" id="interfaceTab">
					<el-tab-pane :name="0" label="接口">
						<interface :interid="interid"></interface>
					</el-tab-pane>
					<el-tab-pane :name="2" label="全局">
						<global :interid="interid"></global>
					</el-tab-pane>
					<el-tab-pane :name="3" label="设置">
						<setting :interid="interid"></setting>
					</el-tab-pane>
					<el-tab-pane :name="4" label="版本">
						<version :interid="interid"></version>
					</el-tab-pane>
				</el-tabs>

                <switchproject :projtype="projtype" :projectid="interid" :teamid="teamid" style="position: absolute;top: 5px;right: 10px;z-index: 1000;font-size: 14px" v-if="!shareRole">
                </switchproject>
			</el-row>
		</el-col>
		
		<!-- <el-col class="col right_side" style="">
			<el-row class="row right_head" style="">
				<el-col class="col" :span="18" style="font-size: 15px;font-weight: bold;color:#17B9E6 ">
					接口管理 - 列表
				</el-col>
				
				<userSession></userSession>
			</el-row>
			<el-row style="" class="right_content">
				<el-col class="col" style="" id="showContent">
					<el-row class="row" style="margin-top: 10px">
					   
						<el-tabs v-model="type" style="height: 50px;" id="interfaceTab">
							<el-tab-pane :name="0" label="接口">
								<interface :interid="interid"></interface>
							</el-tab-pane>
							<el-tab-pane :name="2" label="全局">
								<global :interid="interid"></global>
							</el-tab-pane>
							<el-tab-pane :name="3" label="设置">
								<setting :interid="interid"></setting>
							</el-tab-pane>
							<el-tab-pane :name="4" label="版本">
								<version :interid="interid"></version>
							</el-tab-pane>
						</el-tabs>
					</el-row>
				</el-col>
			</el-row>
		</el-col> -->

   </transition>
</template>

<style>
    #interfaceTab .el-tabs__header {
        background-color: white;
		border-top: 1px solid #eee;
    }
    #interfaceTab .el-tabs__nav-scroll {
        padding-left: 20px;
        padding-right: 20px;
    }
    #interfaceTab .el-tabs__header {
        margin-bottom: 5px;
    }
</style>

<script>
/**
  <switchproject :projtype="projtype" :projectid="interid" style="position: absolute;top: 5px;right: 10px;z-index: 1000;font-size: 14px" v-if="!shareRole">
                    </switchproject>
 */

    //var store=require("../../store")._modulesNamespaceMap["project/info/"].context;
    var store=require("../store")._modulesNamespaceMap["info/"].context;
    var inter=require("./interface/interface.vue")
    var setting=require("./setting/setting.vue")
    var global=require("./global/global.vue")
    var version=require("./version/version.vue")
    
    var sessionChange=require("common/mixins/session");
    var refresh=require("common/mixins/refresh");
    var switchProject=require("component/switchProject.vue");
    var userSession=require("component/userSession.vue")

    module.exports = {
        data: function () {
            return {               
                type:0,
                projtype:"interface",
                selProject:session.get("projectName"),
                timerSave:null
            }
        },
        store:store,
        mixins:[sessionChange,refresh],
        components:{
            "userSession":userSession,
            "switchproject":switchProject,

            "interface":inter,
            "setting":setting,
            "global":global,
            "version":version
        },
        computed:{
			interid:function () {
                return this.$store.state.interid;
            },
            teamid:function () {
                return this.$store.state.teamid;
            },
            shareRole:function () {
                return this.$store.getters.shareRole;
            }
        },
        methods: {

        },
        created:function () {

        },
    }
</script>