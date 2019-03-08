<template>
    <div>
        切换项目：&nbsp;
        <el-cascader size="mini" expand-trigger="hover" :options="arrProject" v-model="arrSelProject" @change="changeProject" placeholder="请切换项目">
        </el-cascader>
    </div>
</template>

<style>

</style>

<script>
    var sessionChange=require("common/mixins/session");
    module.exports = {
        props:["testid"],

        data: function () {
            return {
                //arrSelProject:[session.get("projectType"),session.get("projectId")],
                projectType:"test",


                arrSelProject:["test",this.testid],
                arrProject:[
                    // {
                    //     value:"interface",
                    //     label:"接口",
                    //     children:[]
                    // },
                    // {
                    //     value:"doc",
                    //     label:"文档",
                    //     children:[]
                    // },
                    {
                        value:"test",
                        label:"测试",
                        children:[]
                    }
                ]
            }
        },
        mixins:[sessionChange],
        methods: {
            changeProject:function (val) {
                console.log("testproj>test>component>switchProject.vue>changeProject-val")
                console.log(val)

                var id=val[val.length-1];

                //var arr=this.arrProject[0].children.concat(this.arrProject[1].children).concat(this.arrProject[2].children);
                var arr=this.arrProject[0].children;
                var obj;

                console.log("testproj>test>component>switchProject.vue>changeProject-arr")
                console.log(arr)

                for(var i=0;i<arr.length;i++)
                {
                    if(arr[i].value==id)
                    {
                        obj=arr[i];
                        break;
                    }
                }
                console.log("testproj>test>component>switchProject.vue>changeProject-obj")
                console.log(obj)

                
                if(this.projectType!=obj.type)
                {
                    this.$store.dispatch("project/changeToInfo",{
                        id:obj.value,
                        name:obj.label,
                        type:obj.type
                    },{
                        root:true
                    })
                }
                else
                {   
                    window.location.href="test.html?testid="+obj.value;
                    
                        // session.set("projectId",obj.value);
                        // session.set("projectName",obj.label);
                        // $.startLoading(1);
                        // this.$store.dispatch("init").then(function () {
                        //     $.stopLoading(1);
                        // });
                    
                }
            },
        },
        created:function () {
            var _this=this;
            var query={
                name:""
            }
            if(this.session.teamId)
            {
                query.team=this.session.teamId
            }
            Promise.all([
                // net.get("/project/filterlist",query),
                // net.get("/doc/filterlist",query),
                net.get("/test/filterlist",query)
            ]).then(function (values) {
                // var data1=values[0];
                // var data2=values[1];
                var data3=values[0];
                // if(data1.code==200)
                // {
                //     _this.arrProject[0].children=data1.data.map(function (obj) {
                //         return {
                //             label:obj.name,
                //             value:obj._id,
                //             type:"interface"
                //         }
                //     });
                // }
                // if(data2.code==200)
                // {
                //     _this.arrProject[1].children=data2.data.map(function (obj) {
                //         return {
                //             label:obj.name,
                //             value:obj._id,
                //             type:"doc",
                //             open:obj.open
                //         }
                //     });
                // }
                if(data3.code==200)
                {
                    _this.arrProject[0].children=data3.data.map(function (obj) {
                        return {
                            label:obj.name,
                            value:obj._id,
                            type:"test",
                        }
                    });
                }
            })
        }
    }
</script>









