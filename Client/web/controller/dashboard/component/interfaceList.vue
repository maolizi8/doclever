<template>
    <el-tree :data="data" :props="defaultProps" node-key="id"  
    :render-content="renderContent" highlight-current ref="tree" @current-change="info" style="font-size: 14px" empty-text="暂无模块">
    </el-tree>

    <!-- <el-row class="row" style="padding:10px;">

 
        <table class="table  box-shadow">
            <thead>
                <tr>
                    <th>团队名称</th>
                    <th>项目列表</th>
                </tr>
            </thead>
            <tr v-for="(team,index) in arr" :key="index">
                <td>{{team.name}}</td>
                <td>
                    <table class="table  box-shadow">
                        <thead>
                            <tr>
                                <th>项目名称</th>
                                <th>分组列表</th>
                            </tr>
                        </thead>
                        <tr v-for="(proj,index) in team.data" :key="index">
                            <td>{{proj.name}}</td>
                            <td>
                                <table class="table  box-shadow">
                                    <thead>
                                        <tr>
                                            <th>分组名称</th>
                                            <th>接口列表</th>
                                        </tr>
                                    </thead>
                                    <tr v-for="(group,index) in proj.data" :key="index">
                                        <td>{{group.name}}</td>
                                        <td>
                                            <table class="table  box-shadow">
                                                <thead>
                                                    <tr>
                                                        <th>接口名称</th>
                                                        <th>接口信息</th>
                                                    </tr>
                                                </thead>
                                                <tr v-for="(inter,index) in group.data" :key="index">
                                                    <td>{{inter.name}}</td>
                                                    <td>{{inter.baseurl}}{{inter.url}}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>

        </table>
    </el-row> -->
</template>

<style>
    
</style>

<script>
    
    module.exports={
        name:"interfacelist",
        props:{
            level:{
                type:Number,
                default:0
            },
            data:Array,
            parent:Object
        },
        data:function () {
            return {
                defaultProps:{
                    children:"data",
                    label:"name"
                }
            }
        },
        directives:{
            
        },
        computed:{
            data:function () {
               console.log('dashboard>interfacelist>data')
                console.log(this.$store.state.interfaceList)
                return this.$store.state.interfaceList
            },
            
        },
        methods:{
          renderContent:function(h, { node, data, store }) {

                return (
                        <span class="testMenu" style="display:inline-block;font-size:15px;height:26px;line-height:26px">
                            <span class="testLabel" style={{
                                height:'26px',
                                lineHeight:'26px',
                                display:'inline-block',
                                fontSize: '14px',
                                color: 'black'
                            }}>
                            {node.level < 3 ? (node.label + "(" + node.childNodes.length + ")") : node.label}
                            </span>
                    </span>
                );
            },
            info:function (data,node) {
                if(node.level<3)
                {
                    return;
                }
                $.startLoading(3);
                var _this=this;

                this.$store.dispatch("info",node).then(function (data) {
                    $.stopLoading();
                    if(data.code!=200)
                    {
                        $.notify(data.msg,0);
                    }
                    else
                    {
                        _this.$nextTick(function () {
                            var ele=document.getElementById("testBasicInfo");
                            if(ele)
                            {
                                _this.$store.getters.event.$emit("initTestContent",data.data);
                            }
                            else
                            {
                                _this.$store.state.tempData=data.data;
                            }
                        })
                    }
                });
            }
        },
        created:function () {
           
        }
    }
</script>