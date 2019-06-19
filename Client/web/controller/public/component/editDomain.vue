<template>
    <el-dialog :title="info._id?'编辑':'创建'" :close-on-click-modal="false"  width="80%" ref="box" :visible.sync="showDialog" append-to-body>
     
        <el-form label-position="top" ref="form" label-width="100px">
            <el-form-item label="domain">
                <el-input  style="width: 100%"  v-model.trim="info.domain" placeholder="请输入域，例如：mall.yaoex.com"></el-input>
            </el-form-item>
            <el-form-item label="host">
                <el-input  style="width: 100%"  v-model.trim="info.host" placeholder="请输入域对应的host，例如：10.6.218.102"></el-input>
            </el-form-item>
            <el-form-item label="平台">
                <el-input  style="width: 100%"  v-model.trim="info.platform" placeholder="请输入平台"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showAdd = false">取 消</el-button>
            <el-button type="primary" @click.native="saveHost()" :loading="addPending">确 定</el-button>
        </span>
    </el-dialog>
</template>

<style scoped>
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
    #form-info .el-form-item__label {
        padding-bottom: 0px;
        height: 30px;
    }
    #form-info  .el-form-item {
        margin-bottom: 0;
    }

    .el-form-item{
        margin-bottom: 10px;
    }
    .el-form-item__label{
        padding:4px 14px;
    }
    .el-cascader--mini{
        width: 90%;
    }
    th,td{
        padding: 2px 0;
    }
    tr.el-table__row>th,
    tr.el-table__row>td{
        padding: 2px 0;
    }
    .el-table td, .el-table th{
        padding: 2px 0;
    }
    
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;height: 66%;
    }
</style>

<script>
     var sessionChange=require("common/mixins/session");
    module.exports={
        props:["info"],
        data:function () {
            return {
                showDialog:false,
            }
        },
        mixins:[sessionChange],
        directives:{
            
        },
        computed:{
            
        },
        methods:{
            saveHost:function(){
                if(!this.info.domain)
                {
                   
                    $.tip("请输入域！",0);
                    return;
                }
                if(!this.info.host)
                {
                   
                    $.tip("请输入HOST！",0);
                    return;
                }

                $.startHud();
                var _this=this;
                _this.addPending=true;
                var query={
                    domain:_this.info.domain,
                    host:_this.info.host,
                    platform:_this.info.platform
                }
                if (_this.info._id) {
                    query.id=_this.info._id
                }
                
                net.post("/tools/savedomainhost",query).then(function (data) {
                    console.log("domainHost.vue>>data");
                    console.log(data);
                    $.stopHud();
                     _this.addPending=false;
                    if(data.code==200)
                    {
                        
                         $.notify("保存成功！",1)
                         _this.showDialog=false;
                        _this.$emit("save");
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                }).catch(function (err) {
                    $.stopHud();
                     _this.addPending=false;
                    $.notify(err,0);
                })
            },
        },
        created:function () {
          
        }
    }
</script>