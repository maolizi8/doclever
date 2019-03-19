<template>
    <el-dialog title="记录失败原因" :visible.sync="showDialog" width="70%" ref="box"  append-to-body>
       
        <el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
            
            <el-form-item label="选择失败原因">
                <el-radio-group v-model="runReason.reason">
                    <el-radio :label="1">接口变更</el-radio>
                    <el-radio :label="2">应用异常有bug</el-radio>
                    <el-radio :label="3">测试环境异常</el-radio>
                    <el-radio :label="4">应用部署导致</el-radio>
                    <el-radio :label="5">用例问题</el-radio>
                    <el-radio :label="99">其他</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="其他原因">
                <el-input type="textarea" :rows="2"  style="width: 100%"  v-model="runReason.other" placeholder="请输入其他原因"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="recordFailReason" :loading="savePending">确 定</el-button>
        </span>
    </el-dialog>
</template>

<style>
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
</style>

<script>
    
    module.exports={
        props:["pollRun"],
        data:function () {
            return {
               runReason:function () {
                    if(this.pollRun.failReason)
                    {
                        return this.pollRun.failReason
                    }
                    else
                    {
                        return {
                            reason:0,
                            other:"",
                            recorder:""
                        }
                    }
                }.call(this),
                showDialog:false,
                savePending:false
            }
        },
        directives:{
            
        },
        methods:{
            recordFailReason:function () {
               
                if(!this.runReason.reason)
                {
                    $.tip("请选择失败原因",0);
                    return;
                }
                if(this.runReason.reason==99 && !this.runReason.other)
                {
                    $.tip("请输入其他原因",0);
                    return;
                }
                var _this=this;
                
                net.post("/poll/saveruninfo",{
                    id:_this.pollRun._id,
                    reason:_this.runReason.reason,
                    other:_this.runReason.other,
                    recorder:session.get("name")
                }).then(function (data) {
                    _this.savePending=false;
                    if(data.code==200)
                    {
                        $.notify("保存成功",1);
                        _this.showDialog=false;
                         _this.$emit("save",data.data._id);
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            },
            
        },
        created:function () {
            
        }
    }
</script>