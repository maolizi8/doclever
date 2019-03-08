<template>
    <el-container>
        <el-aside width="200px">
            <team :teamid="teamid"></team>
            <!-- <team></team> -->
        </el-aside>
        <el-main>
			<el-row style="" class="right_content">
				<el-col class="col" style="" id="showContent">
					<project :teamid="teamid"></project>
				</el-col>
			</el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
    .side-header {
        padding: 10px;
        border-bottom: 1px solid #eee;
        background-color: #438eb9;
        color: #fff;
        text-align: left;
    }
    .el-row::after, .el-row::before {
        display: none;
    }
    .left-menu{
        background-color: white;
        /* border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24); */
    }
    .team-line{
        text-align: left;
        height: 36px;
        line-height: 36px;
        padding-left: 5px;
    }
    .team-line:hover,.team-line:focus{
        color: #23527c;
        text-decoration: none;
        background-color: #eeeeee;
        border-right: 3px solid deepskyblue;
    }
    .team-line.active{
        background: #f0fbff;
        color: #2395f1;
        border-right: 3px solid deepskyblue;
    }

</style>
<script>
    var sessionChange=require("common/mixins/session");
    var project=require("./projectList.vue");
    var team=require("./teamList.vue");

    module.exports={
        data:function () {
            return {
                
            }
        },
        
        mixins:[sessionChange],
        components:{
           "project":project,
            "team":team
        },
        computed:{
            teamid:function(){
                console.log('interfaceproj>component>mainContent>computed>teamid')
                return this.$store.state.teamid;
            },
            // teamList:function () {
            //     return this.$store.state.teamList;
            // }
        },
        methods:{
            
        }
    }
</script>