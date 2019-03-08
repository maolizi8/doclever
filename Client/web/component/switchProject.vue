<template>
    <div id="switchproject">
        <span v-if="projtype=='interface'">切换接口项目：&nbsp;</span>
        <span v-else-if="projtype=='test'">切换测试项目：&nbsp;</span>
        <span v-else>切换项目：&nbsp;</span>
        <el-cascader size="mini" expand-trigger="hover" :options="arrProject" v-model="arrSetProject" @change="changeProject" placeholder="请切换项目">
        </el-cascader>
    </div>
</template>

<style>
    #switchproject .el-input{
        width: 250px;
    }
</style>

<script>
    var sessionChange=require("common/mixins/session");
    module.exports = {
        props:["projtype","projectid","teamid"],
        data: function () {
            return {
                projtype:this.projtype,

                arrProject:[],
            }
        },
        mixins:[sessionChange],
        computed:{
            arrSetProject:function(){
                //console.log("swithchprojcet>computed>arrSetProject")
                
                if (this.projtype=="interface") {
                    if (this.teamid) {
                        return [this.teamid,this.projectid]
                    } else {
                        return [0,this.projectid]
                    }
                    
                } else if (this.projtype=="test"){
                    return [this.projectid]
                }
            }
        },
        methods: {
            changeProject:function (val) {
                // console.log("switchProject.vue>val")
                // console.log(val)
                
                var arr=this.arrProject;
                var projectid=val[val.length-1];
                

                if(this.projtype=="interface"){
                    
                    console.log("interface:"+projectid)
                    window.location.href="interface.html?interid="+projectid;
                } else  if (this.projtype=="test") {
                     console.log("test:"+projectid)
                    window.location.href="test.html?testid="+projectid;
                }
            },
        },
        created:function () {
            var _this=this;

            var query={
                name:""
            }
            
            if (this.projtype=="interface") {
                net.get("/team/alllist",{}).then(function (data) {
                    if(data.code==200)
                    {
                        _this.arrProject=data.data.map(function (obj) {
                            var teamProject=obj.data.map(function (proj) {
                                return {
                                    label:proj.name,
                                    value:proj._id,
                                    type:"interface"
                                }  
                            });
                            if (obj._id) {
                                var teamObj={
                                    label:obj.name,
                                    value:obj._id,
                                    children:teamProject,
                                }
                            } else {
                                var teamObj={
                                    label:obj.name,
                                    value:0,
                                    children:teamProject,
                                }
                            }
                            

                            return teamObj
                        });
                    }else{
                        throw data.msg;
                    }
                })
                
            } 
			else if(this.projtype=="test") {
                net.get("/test/filterlist2",query).then(function (data) {
                    if(data.code==200)
                    {
                        _this.arrProject=data.data.map(function (obj) {
                            return {
                                label:obj.name,
                                value:obj._id,
                                type:"test"
                            }
                        });
                    }else{
                        throw data.msg;
                    }
                })
            } 

            
            // Promise.all([
            //     net.get("/project/filterlist",query),
            //     net.get("/doc/filterlist",query),
            //     net.get("/test/filterlist",query)
            // ]).then(function (values) {
            //     var data1=values[0];
            //     var data2=values[1];
            //     var data3=values[2];
            //     if(data1.code==200)
            //     {
            //         _this.arrProject[0].children=data1.data.map(function (obj) {
            //             return {
            //                 label:obj.name,
            //                 value:obj._id,
            //                 type:"interface"
            //             }
            //         });
            //     }
            //     if(data2.code==200)
            //     {
            //         _this.arrProject[1].children=data2.data.map(function (obj) {
            //             return {
            //                 label:obj.name,
            //                 value:obj._id,
            //                 type:"doc",
            //                 open:obj.open
            //             }
            //         });
            //     }
            //     if(data3.code==200)
            //     {
            //         _this.arrProject[2].children=data3.data.map(function (obj) {
            //             return {
            //                 label:obj.name,
            //                 value:obj._id,
            //                 type:"test",
            //             }
            //         });
            //     }
            // })
        }
    }
</script>









