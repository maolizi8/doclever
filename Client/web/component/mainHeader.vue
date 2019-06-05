<template>
    <el-row style="height:60px;">
        <div style="float:left;">
            <el-col class="col header-dropdown" style="height:60px;">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" style="color: #50bfff;cursor: pointer;font-size:22px;">
                        <i class="fa fa-home" style="font-size:40px;"></i>
                        岗岭API接口测试
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu class="header-menu" slot="dropdown">
                        <el-dropdown-item command="goToInterface">接口项目管理</el-dropdown-item>
                        <el-dropdown-item command="goToTest">测试项目管理</el-dropdown-item>
                        <el-dropdown-item command="goToPoll">定时任务管理</el-dropdown-item>
                        <el-dropdown-item command="goToStatistics">测试结果统计</el-dropdown-item>
                        <el-dropdown-item command="goToFigureInterfaces" v-if="sysRole">接口统计配置</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </div>
        <div style="float:left;color: #50BFFF;">
            <!-- <i class="fa fa-home" style="font-size:40px;"></i>
            <a class="header" href="project.html" style="">
                岗岭API接口测试
            </a> -->
            <span v-if='menu=="interface"'>
                <a class="header" :href="'project.html?teamid='+team" v-if="team">
                    接口项目管理
                </a>
                <a class="header" href="project.html" v-else>
                    接口项目管理
                </a>
                <span class=""  v-if='islist=="1"'>
                    / 接口项目详情
                </span>
            </span>
            <span v-else-if='menu=="test"'>
                <a class="header" href="test.html">
                    测试项目管理
                </a>
                <span class="" v-if='islist=="1"'>
                    / 测试项目详情
                </span>
            </span>
            <span v-else-if='menu=="testpoll"'>
               <a class="header" href="testpoll.html">
                    定时任务管理
                </a>
                <span class="" v-if='islist=="1"'>
                    / 定时任务运行记录
                </span>
            </span>
            <span v-else-if='menu=="teststatistics"'>
               <a class="header" href="statistics.html">
                    测试结果统计
                </a>
            </span>
            <span v-else-if='menu=="pollinter"'>
               <a class="header" href="pollinter.html">
                    接口统计配置
                </a>
            </span>
            <span v-else-if='menu=="person"'>
               个人资料编辑
            </span>
        </div>
        
        <div style="float:right;text-align: right;">
            <userSession></userSession>
        </div>
        <div style="clear:both;"></div>
    </el-row>
</template>
<style scoped>
    a{
        cursor: pointer;
    }
    .header{
        color: #50BFFF;
        cursor: pointer;
        font-size:18px;
    }
    .header:hover{
        text-decoration: underline;
    }
    .header:hover{
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
        props:["menu","islist"],
        data:function () {
            return {
                //team:this.teamid?this.teamid:"",
                menu:this.menu,
                islist:this.islist?this.islist:0
            }
        },
        computed:{
            sysRole:function () {
                console.log('session.get-role>')
                console.log(session.get("role"))
                if (session.get("role")==0 || session.get("role")==2 ) {
                    return true
                } else {
                    return false
                }
            },
            team:function(){
                console.log("mianHeader.vue>teamid:")
                if (this.islist=="1") {
                    console.log(this.$store.state.info.teamid)
                    return this.$store.state.info.teamid?this.$store.state.info.teamid:""
                } else {
                    console.log(this.$store.state.teamid)
                    return this.$store.state.teamid?this.$store.state.teamid:""
                }
                
                
            }
        },
        methods:{
            handleCommand:function (command) {
                if(command=="goToTest"){
                    window.open("test.html",'_self')
                } else if(command=="goToInterface") {
                    window.open("project.html",'_self')
                }
                else if(command=="goToPoll") {
                    window.open("testpoll.html",'_self')
                }else if (command=="goToStatistics") {
                    window.open("statistics.html",'_self')
                }else if (command=="goToFigureInterfaces") {
                    window.open("pollinter.html",'_self')
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