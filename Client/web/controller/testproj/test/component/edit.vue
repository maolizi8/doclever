<template>
    <el-row class="row" style="padding: 0 10px 0 10px;font-size: 14px">
        <el-col class="col" :span="6" style="padding-right: 5px;height: 35px;line-height: 35px">
            <!-- <el-row class="row">
                <span style="width: 60px;">参与用户：</span>
                <el-select size="mini" v-model="$store.state.selUser" :style="{width: cooperationRole?'calc(85% - 75px)':'calc(100% - 75px)'}" @input="changeUser">
                    <el-option v-for="item in arrUser" :label="item.name" :value="item._id" :key="item._id"></el-option>
                </el-select>
                <el-button size="mini" icon="fa fa-users" type="text" style="width: calc(15% - 5px)" @click="editCooperation" v-if="cooperationRole"></el-button>
            </el-row> -->
            <el-row class="row" id="testModuleMenu" style="">
                <el-tabs v-model="type" id="testType">
                    <el-tab-pane name="test" label="用例">
                        <testlist :testid="testid"></testlist>
                    </el-tab-pane>
                    <el-tab-pane name="collection" label="集合">
                        <collectionlist :testid="testid"></collectionlist>
                    </el-tab-pane>
                </el-tabs>
                <el-button v-if="editRole" class="addmoudle" type="text" title="添加模块/集合" :testid="testid" @click="addModule">
                    <i class="el-icon-plus" style="font-weight: 900"></i>
                </el-button>
            </el-row>
        </el-col>
        <el-col class="col" :span="18" id="testInfoContent" style="">
            <keep-alive>
                <transition name="component-fade" mode="out-in">
                    <component :is="$store.state.infoType" :testid="testid"></component>
                </transition>
            </keep-alive>
        </el-col>
    </el-row>
</template>

<style>
    #testModuleMenu{
        min-height: 300px;
        height: calc(100vh - 127px);
        /* overflow-y: auto; */
        margin-top: 5px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24)
    }
    #testInfoContent{
        height: calc(100vh - 114px);
        min-height: 500px;
        }
    .addmoudle{
        position: absolute;right: 10px;top: 0px;width: 20px;height: 20px;font-weight: 900
    }
    #testType{
        overflow-x: hidden;
        /* height: 415px;
        overflow-y: scroll; */
    }
    #testType .el-tabs__nav-scroll {
        padding-left: 20px;
        padding-right: 0px;
    }
    #testType>.el-tabs__content{
        height: calc(100vh - 175px);
        overflow-y: scroll;
    }
</style>

<script>

/** 
 * <el-button style="position: absolute;right: 10px;top: 0px;width: 20px;height: 20px;font-weight: 900" type="text" title="添加模块" :testid="testid" @click="addModule" v-if="editRole">
                    <i class="el-icon-plus" style="font-weight: 900"></i>
                </el-button>
*/
    var testList=require("./testList.vue");
    var testInfo=require("./testInfo.vue");
    var collectionList=require("./collectionList.vue");
    var collectionInfo=require("./collectionInfo.vue");
    module.exports={
        props:["testid"],
        data:function () {
            return {
                type:"test",
                testid:this.testid
            }
        },
        components:{
            "testlist":testList,
            "testinfo":testInfo,
            "collectionlist":collectionList,
            "collectioninfo":collectionInfo
        },
        watch:{

        },
        computed:{
            arrUser:function () {
                if(!this.$store.state.test.owner._id)
                {
                    return [];
                }
                return [this.$store.state.test.owner].concat(this.$store.state.test.users)
            },
            cooperationRole:function () {
                return session.get("id")==this.$store.state.selUser;
            },
            editRole:function () {
                return this.$store.getters.editRole;
            }
        },
        methods:{
            changeUser:function () {
                $.startHud();
                this.$store.dispatch("changeUser").then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        $.notify("切换成功",1);
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            addModule:function () {
                if(this.type=="test")
                {
                    this.$store.getters.event.$emit("addTestModule");
                }
                else if(this.type=="collection")
                {
                    this.$store.getters.event.$emit("addCollection");
                }
            },
            editCooperation:function () {
                var _this=this;
                $.startHud();
                Promise.all([
                    net.get("/test/users",{
                        //project:session.get("projectId")
                        project:_this.testid
                    }),
                    net.get("/test/cooperation",{
                        //project:session.get("projectId")
                        project:_this.testid
                    }),
                ]).then(function (values) {
                    $.stopHud();
                    var obj1=values[0];
                    var obj2=values[1];
                    if(obj1.code!=200)
                    {
                        $.notify(obj1.msg,0);
                        return;
                    }
                    else if(obj2.code!=200)
                    {
                        $.notify(obj2.msg,0);
                        return;
                    }
                    $.showBox(_this,require("./testCooperation.vue"),{
                        arrUser:obj1.data,
                        arrCooperation:obj2.data,
                        testid:_this.testid
                    })
                })
            }
        },
    }
</script>