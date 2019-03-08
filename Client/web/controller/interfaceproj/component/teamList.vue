<template>
    <el-row class="row left-menu">
        <el-row class="side-header">
            <i class="fa fa-list"></i>&nbsp;团队列表
            <el-tooltip class="item" effect="dark" content="新增团队" placement="bottom" style="float:right;margin-right:5px;">
                <i class="el-icon-plus" style="font-weight:900" @click="showAdd=true"></i>
            </el-tooltip>
            
        </el-row>
        <el-row v-for="(item,index) in teamList" v-model="teamList" :key="index" class="team-line" :class="{active: teamid==item._id}" @click.native="changeTeam(item._id)"> 
            <i class="fa fa-folder-open"></i>&nbsp;{{ item.name }}
        </el-row>   

         <el-dialog title="新建团队" :visible.sync="showAdd" width="50%" append-to-body>
            <el-form label-position="top" ref="form" label-width="100px">
                <el-form-item label="名称">
                    <el-input size="small" style="width: 100%"  v-model.trim="name" placeholder="请输入新团队的名称"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input size="small" type="textarea" :rows="2"  style="width: 100%"  v-model="dis" placeholder="请输入新团队的简介"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showAdd = false">取 消</el-button>
                <el-button type="primary" @click="addTeam" :loading="addPending">确 定</el-button>
            </span>
        </el-dialog>

    </el-row>
       
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
    
    module.exports={
        props:["teamid"],
        data:function () {
            return {
                addPending:false,
                showAdd:false,
                name:"",
                dis:"",
            }
        },
        mixins:[sessionChange],
        components:{
           
        },
        computed:{
            // teamid:function(){
            //     console.log('interfaceproj>component>teamList>computed>teamid')
            //     return this.$store.state.teamid;
            // },
            teamList:function () {
                return this.$store.state.teamList;
            }
        },
        methods:{
            changeTeam:function (teamid) {
                window.open("project.html?teamid="+teamid,"_self")
            },
           addTeam:function () {
                if(!this.name)
                {
                    this.$message.error("请输入名称");
                    return;
                }
                var _this=this;
                this.addPending=true;
                this.$store.dispatch("addTeam",{
                    name:this.name,
                    dis:this.dis
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
            }
        }
    }
</script>
