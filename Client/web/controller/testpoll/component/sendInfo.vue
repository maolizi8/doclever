<template>
    <el-dialog title="设置邮件发送者" :visible.sync="showDialog" width="70%" ref="box"  append-to-body>
       
        <el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   发件人邮箱账户:
                </el-col>
                <el-col class="col" :span="20">
                     <el-input size="small" placeholder="请输入发件人的邮箱账户(如：aaa@qq.com)" style="width: 80%" v-model="setting.sendInfo.user"></el-input>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   发件人邮箱密码:
                </el-col>
                <el-col class="col" :span="20">
                     <el-input size="small" placeholder="请输入发件人的邮箱密码" style="width: 80%" v-model="setting.sendInfo.password" type="password"></el-input>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   发件人smtp地址:
                </el-col>
                <el-col class="col" :span="20">
                    <el-input size="small" placeholder="请输入发件人的smtp地址(如：smtp.qq.com)" style="width: 80%" v-model="setting.sendInfo.smtp"></el-input>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   发件人smtp端口:
                </el-col>
                <el-col class="col" :span="20">
                    <el-input size="small" placeholder="请输入发件人smtp端口号" style="width: 80%" v-model="setting.sendInfo.port"></el-input>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                    默认发件人:
                </el-col>
                <el-col class="col" :span="20">
                   <el-switch v-model="setting.isDefault" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   发送测试邮件:
                </el-col>
                <el-col class="col" :span="20">
                   <el-switch v-model="immediate" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                </el-col>
            </el-row>
            <el-row class="row line-36" v-if="immediate==true">
                <el-col class="col" :span="4">
                    测试收件人:
                </el-col>
                <el-col class="col" :span="20">
                    <el-input size="small" placeholder="请输入收件人邮箱" style="width: 80%" v-model="reciever"></el-input>
                </el-col>
            </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="setPollSender" :loading="savePending">确 定</el-button>
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
        props:["pollSet"],
        data:function () {
            return {
                setting:this.pollSet?this.pollSet:{
                    sendInfo:{
                                user:"",
                                password:"",
                                smtp:"",
                                port:465
                            },
                    isDefault:1
                },
                immediate:0,
                reciever:"",
                showDialog:false,
                savePending:false,

                // props:{
                //     value:"_id",
                //     label:"name",
                //     children:"data"
                // }
            }
        },
        directives:{
            
        },
        methods:{
            setPollSender:function () {
               
                if(!this.setting.sendInfo.user)
                {
                    $.tip("请输入发件人邮箱账户",0);
                    return;
                }
                if(!this.setting.sendInfo.password)
                {
                    $.tip("请输入发件人邮箱密码",0);
                    return;
                }
                if(!this.setting.sendInfo.smtp)
                {
                    $.tip("请输入发件人smtp地址",0);
                    return;
                }
                if(!this.setting.sendInfo.port)
                {
                    $.tip("请输入发件人smtp端口",0);
                    return;
                }
                this.savePending=true;
                var _this=this;
                var query={
                    user:this.setting.sendInfo.user,
                    password:this.setting.sendInfo.password,
                    smtp:this.setting.sendInfo.smtp,
                    port:this.setting.sendInfo.port,
                    isdefault:Number(this.setting.isDefault),
                    immediate:Number(this.immediate),
                    reciever:this.reciever
                };
                if(this.setting._id)
                {
                    query.id=this.setting._id;
                }
                net.post("/poll/savepollset",query).then(function (data) {
                    _this.savePending=false;
                    if(data.code==200)
                    {
                        $.notify("保存成功",1);
                        _this.showDialog=false;
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