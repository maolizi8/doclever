<template>
    <el-row style="height:60px;">
        <div style="width:260px;float:left;">
            <el-row class="row" style="height:60px;">
                <el-col class="col" style="width:60px;text-align:center;">
                    <img src="../resource/pic/default.png" style="width:40px;height:40px;margin-top: 10px">
                </el-col>
                <el-col class="col header-dropdown" style="height:60px;width:200px;">
                    <el-dropdown @command="handleCommand" v-if='menu=="interface"'>
                        <span class="el-dropdown-link" style="color: #50bfff;cursor: pointer;font-size:22px;">
                            接口项目管理
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu class="header-menu" slot="dropdown">
                            <el-dropdown-item command="goToTest">测试项目管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown @command="handleCommand" v-else-if='menu=="test"'>
                        <span class="el-dropdown-link" style="color: #50bfff;cursor: pointer;font-size:22px;">
                             测试项目管理
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu class="header-menu" slot="dropdown">
                            <el-dropdown-item command="goToInterface">接口项目管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <el-dropdown @command="handleCommand" v-else-if='menu=="testpoll"'>
                        <span class="el-dropdown-link" style="color: #50bfff;cursor: pointer;font-size:22px;">
                            定时任务管理
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu class="header-menu" slot="dropdown">
                            <el-dropdown-item command="goToInterface">接口项目管理</el-dropdown-item>
                            <el-dropdown-item command="goToTest">测试项目管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </div>
        <div style="float:left;width:72px;text-align:left;font-size:12px;">
            <a  v-if='menu=="interface" && islist=="1"' :href="'project.html?teamid='+team">返回项目列表</a>
            <a  v-else-if='menu=="test" && islist=="1"' href="test.html">返回项目列表</a>
            <a  v-else-if='menu=="testpoll" && islist=="1"' href="testpoll.html">返回任务列表</a>
            <span v-else> &nbsp; </span>
        </div>
        <div  style="float:left;text-align:center;">
            <span  v-if='menu=="interface" && islist=="0"'>接口项目列表</span>
            <span  v-else-if='menu=="interface" && islist=="1"'>接口项目详情</span>
            <span v-else-if='menu=="test" && islist=="0"'>测试项目列表</span>
            <span v-else-if='menu=="test" && islist=="1"'>测试项目详情</span>
            <span v-else-if='menu=="testpoll" && islist=="0"'>定时任务列表</span>
            <span v-else-if='menu=="testpoll" && islist=="1"'>定时任务运行记录</span>
            <span v-else>DOClever接口测试平台</span>
        </div>
        <div style="width:200px; float:right;">
            <userSession></userSession>
        </div>
        <div style="clear:both;"></div>
    </el-row>
</template>
<style scoped>
    a{
        text-decoration: underline;
    }
    #selectHeader{
        width: 90%;
        text-align: center;
        font-size:16px;
        border: none;
        background-color: lightblue;
    }

   .header-menu{
       top: 53px;
       left: 72px;
       width: 163px;
   }
    .header-menu>.popper__arrow{
        top: -4px;
        left: 98px;
    }
</style>


<script>
    var userSession=require("component/userSession.vue")
    module.exports={
        props:["menu","islist","teamid"],
        data:function () {
            return {
                menu:this.menu,
                islist:this.islist,
                //team:this.teamid?this.teamid:""
            }
        },
        computed:{
            team:function(){
                console.log("mianHeader.vue>teamid:")
                console.log(this.$store.state.info.teamid)
                return this.$store.state.info.teamid?this.$store.state.info.teamid:""
            }
        },
        methods:{
            handleCommand:function (command) {
                if(command=="goToTest"){
                    window.open("test.html",'_self')
                } else if(command=="goToInterface") {
                    window.open("project.html",'_self')
                }
            }
        },
        components:{
            "userSession":userSession
        },
        created:function () {
           
        }
    }
</script>