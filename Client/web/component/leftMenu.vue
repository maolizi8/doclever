<template>
    <el-col class="col left_side" style="">
        <el-row class="row left_home" style="">
            
                <a href="/">
                    <img src="../resource/pic/logo-transparent.png" style="width:40px;height:40px;margin-top: 10px">
                </a>
            
        </el-row>
        <el-row class="row" style="">
                
                <a href="project.html" style="" class="row left_tab" :class="{ active: menu=='project'}">
                    <i aria-hidden="true"  class="fa fa-list-alt fa-2x"></i>
                    <br>接口
                </a>
                <a href="test.html" style="" class="row left_tab" :class="{ active: menu=='test'}">
                    <i aria-hidden="true"   class="fa fa-balance-scale fa-2x"></i>
                    <br>测试
                </a>
                <!--  <a href="document.html" style="" class="row left_tab" :class="{ active: menu=='document'}">
                    <i aria-hidden="true"   class="fa fa-folder fa-2x"></i>
                    <br>文档
                </a>
               <a href="team.html" class="row left_tab" :class="{ active: menu=='team'}">
                    <i aria-hidden="true"   class="fa fa-bullseye fa-2x"></i>
                    <br>团队
                </a> -->
                <a href="testpoll.html" class="row left_tab" :class="{ active: menu=='testpoll'}" v-if="menu=='testpoll'">
                    <i aria-hidden="true"   class="fa fa-retweet fa-2x"></i>
                    <br>定时任务
                </a>
                <a href="setting.html" class="row left_tab" :class="{ active: menu=='setting'}">
                    <i aria-hidden="true"   class="fa fa-cog fa-2x"></i>
                    <br>设置
                </a>
            
        </el-row>
    </el-col>
</template>

<script>
/**
 * <i class="fa fa-home" style="font-size:44px;color:white;width:40px;height:40px;margin-top: 10px;"></i>
 */
    module.exports={
        props:["menu"],
        data:function () {
            return {
                menu:this.menu
            }
        },
        methods:{
            
        },
        created:function () {
           
        }
    }
</script>