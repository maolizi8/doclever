<template>
    <el-row class="row" id="maincontent">
        <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
            <span style="font-size: 18px;color: black;">测试环境HOST配置</span> 
            <a href="/html/web/views/statistic/allhost.html" target="_blank" style="margin-left: 50px">导出全部host</a>
            <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px"  @click.native="openPop()" v-if="sysRole==0 || sysRole==1 || sysRole==2 ">
                <i class="fa fa-plus"></i> 添加Host
            </el-button>
            <el-button type="primary" size="mini" style="float: right;margin-right: 10px;margin-top: 5px"  @click.native="importHost()" v-if="sysRole==0 || sysRole==1 || sysRole==2 ">
                <i class="fa fa-download"></i> 导入Host
            </el-button>
        </el-row>
        <el-row class="row" style="height: 1px;background-color: lightgray"></el-row>
        <el-row class="" style="border-bottom-left-radius: 5px;border-bottom-right-radius: 5px">
            <table class="table box-shadow">
                <thead>
                    <tr>
                        <th style="width:55px;">序号</th>
                        <th style="width:300px;">Domain</th>
                        <th style="width:300px;">HostIP</th>
                        <th style="width:200px;">平台</th>
                        <th style="width:80px">操作</th>
                    </tr>
                </thead>
                <tbody id="">
                    <tr v-for="(item,index) in hostList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.domain}}</td>
                        <td>{{item.host}}</td>
                        <td>{{item.platform}}</td>
                        <td>
                            <el-button type="text" size="mini" @click.native="openPop(item)" v-if="sysRole==0 || sysRole==1 || sysRole==2 ">
                                编辑
                            </el-button>
                            <el-button type="text" style="color: red" size="mini" @click.native="remove(index)" v-if="sysRole==0 || sysRole==1 || sysRole==2 ">
                                删除
                            </el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </el-row>

    </el-row>
   
</template>

<style>
    
    
    #maincontent{
        padding:10px 20px;
   }
    .line-36{
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        /* text-align: center; */
        }
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;height: 66%;
    }
    .table{
        width: 100%;
        padding: 10px;
        display: table;
        border-collapse: collapse;
        border-spacing: 2px;
        border:1px solid #cccccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        background-color: white;
    }
    .table th{
        background-color: #E0EEEE;
    }
    .table th,.table td{
        vertical-align: middle;
        padding: 5px;
        text-align: center;
        border:1px solid #cccccc;
    }
    .table-light{
        border:1px solid #eeeeee;
    }
    .table-light th,.table-light td{
        border:1px solid #eeeeee;
    }
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;
    }
    
    .clear{
        height:20px;
        clear: both;
    }
    .line-num{
        background-color: #eeeeee;
        width: 15px;
    }
</style>

<script>
var sessionChange=require("common/mixins/session");
    module.exports={
        //props:["info"],
        data:function () {
            return {
                showAdd:false,
                addPending:false,
                savePending:false,
                hostList:[]
            }
        },
         mixins:[sessionChange],
        directives:{
            
        },
        computed:{
			sysRole:function () {
               
                return session.get("role")
            },
        },
		components:{
            //"page":page
        },
        methods:{
            
            openPop:function (item) {
                var _this=this;
                
                var info;
                if (item) {
                    info=item
                }else{
                    info={
                        domain:"",
                        host:"",
                        platform:"",
                    }
                }
                var child=$.showBox(_this,require("./editDomain.vue"),{
                        "info":info
                    })

                child.$on("save",function (data) {
                    console.log('child.save')
                    window.location.reload()
                    // if (data.isnew) {
                    //     _this.arr.push(data.data)
                    // }
                })
                
            },
            remove:function (index){
                console.log('domainHost.vue>>remove')
                console.log(index)
                var _this=this;
                var item=this.hostList[index]

                $.confirm("是否确认删除该项: "+item.domain+" - "+item.host+" ?",function () {
                    _this.removePending=true;
                    net.delete("/tools/removedoaminhost",{
                        id:item._id
                    }).then(function (data) {
                        _this.removePending=false;
                        if(data.code==200)
                        {
                            $.notify("删除成功",1);
                            _this.showDialog=false;
                            _this.hostList.splice(index,1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },

            importHost:function () {
                var _this=this;
                $.inputMul(_this,"导入的JSON格式的如下：{\"mall.yaoex.com\":\"10.6.218.102\",\"www.111.com\":\"10.6.80.229\"}",function (val) {
                    if(!val)
                    {
                        $.tip("请输入JSON",0);
                        return false;
                    }
                    if(val.indexOf('{')!=0)
                    {
                        $.tip("请输入正确的JSON！",0);
                        return false;
                    }

                    $.startHud();
                    net.post("/tools/importdomainhost",{
                        json:val
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            $.notify(data.msg,1);
                            setTimeout(function(){
                                 window.location.reload()       
                            },3000);
                            
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                    return true;
                })
            },

        },
        created:function () {
            var _this=this;
            net.get("/tools/domainhostlist").then(function (data) {
                console.log("domainHost.vue>>created");
                console.log(data);
                if(data.code==200)
                {
                    if (data.data) {
                        _this.hostList=data.data
                    }
                
                }
                else
                {
                    $.notify(data.msg,0)
                }
                $.stopLoading();
                $.stopHud();
            }).catch(function (err) {
                console.log("domainHost.vue>>err");
                $.stopLoading();
                $.stopHud();
                $.notify(err,0);
            })
        }
    }
</script>