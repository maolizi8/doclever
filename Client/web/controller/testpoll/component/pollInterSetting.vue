<template>
    <el-row class="row" id="reportcontent">
         <el-form label-position="top" label-width="80px" style="padding: 10px 20px 20px 10px" id="form-info">
            <el-row class="row">
                <el-col class="col" :span="4">
                   收件人:
                </el-col>
                <el-col class="col" :span="20">
                    <!-- <el-input style="width: 90%" size="small" v-model="setting.reciveUsers" placeholder="请输入收件人"></el-input> -->
                    <el-input style="width: 95%" :rows="3" size="small" type="textarea" v-model="setting.reciveUsers" placeholder="请输入收件人邮箱，多个邮箱以;分隔开">
                     </el-input>
                     <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="多个邮箱以;分隔开">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   星期:
                </el-col>
                 <el-col class="col" :span="20">
                    <!-- <el-input style="width: 90%" size="small" v-model="setting.weekday" placeholder="请输入星期"></el-input> -->
                    <el-checkbox-group v-model="setting.weekday">
                        <el-checkbox :label="1">周一</el-checkbox>
                        <el-checkbox :label="2">周二</el-checkbox>
                        <el-checkbox :label="3">周三</el-checkbox>
                        <el-checkbox :label="4">周四</el-checkbox>
                        <el-checkbox :label="5">周五</el-checkbox>
                        <el-checkbox :label="6">周六</el-checkbox>
                        <el-checkbox :label="7">周日</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col class="col" :span="4">
                   时刻:
                </el-col>
                 <el-col class="col" :span="8">
                     <el-select  v-model="setting.hour"  style="width: 90%" >
                         <el-option :value="n+8" v-for="n in 12" :key="n+8">{{n+8}}</el-option>
                     </el-select>
                </el-col>
                <el-col class="col" :span="4">
                   分钟:
                </el-col>
                 <el-col class="col" :span="8">
                    <el-select  v-model="setting.minute" style="width: 90%" >
                         <el-option value="0">0</el-option>
                         <!-- <el-option value="10">10</el-option>
                         <el-option value="20">20</el-option>
                         <el-option value="30">30</el-option>
                         <el-option value="40">40</el-option>
                         <el-option value="50">50</el-option> -->
                     </el-select>
                </el-col>
            </el-row>
            <el-row class="row line-36">
                <el-col class="col" :span="4">
                   定时任务开启:
                </el-col>
                 <el-col class="col" :span="20">
                    <el-switch v-model="setting.enabled" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0"></el-switch>
                    <el-tooltip class="item" effect="dark" placement="bottom" trigger="hover" content="绿色（是），红色（否）">
                        <i class="el-icon-info" style="font-size: 12px;"></i>
                    </el-tooltip>
                </el-col>
            </el-row>
         </el-form>
         <el-row>
            <el-button size="mini" type="primary" @click="save" :loading="savePending">
                保存
            </el-button>
        </el-row>
    </el-row>
   
</template>

<style>
    
    
    #reportcontent{
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
</style>

<script>

    module.exports={
        props:["info"],
        data:function () {
            return {
                savePending:false,
                setting:{}
            }
        },
        directives:{
            
        },
        computed:{
			
        },
		components:{
            //"page":page
        },
        methods:{
           save:function(){
                console.log("pollInterSetting>>save")
                if(!this.setting.reciveUsers)
                {
                   
                    $.tip("请输入收件人！",0);
                    return;
                }
                if(this.setting.weekday.length==0)
                {
                   
                    $.tip("请选择星期！",0);
                    return;
                }
                
                if(!this.setting.hour)
                {
                   
                    $.tip("请选择时间！",0);
                    return;
                }

                var _this=this;
                var query={
                    enabled:_this.setting.enabled,
                    reciveUsers:_this.setting.reciveUsers,
                    weekday:JSON.stringify(_this.setting.weekday),
                    hour:_this.setting.hour,
                    minute:_this.setting.minute
                }
                if (_this.setting._id) {
                    query.id=_this.setting._id
                }
                _this.savePending=true;
                net.post("/poll/pollintersettingsave",query).then(function (data) {
                    console.log("pollintersettingsave>>data");
                    console.log(data);
                     _this.savePending=false;
                    if(data.code==200)
                    {
                        _this.setting=data.data
                         $.notify("保存成功！",1)
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                }).catch(function (err) {
                     _this.savePending=false;
                    $.notify(err,0);
                })
           },
            
        },
        created:function () {
            var _this=this;
            net.get("/poll/pollintersetting").then(function (data) {
                console.log("pollintersetting.vue>>created");
                //console.log(data);
                if(data.code==200)
                {
                    if (data.data) {
                        _this.setting=data.data
                    } else {
                        _this.setting={
                            enabled:1,
                            reciveUsers:'',
                            weekday:[],
                            hour:'',
                            minute:0
                        }
                    }
                
                }
                else
                {
                    $.notify(data.msg,0)
                }
                $.stopLoading();
                $.stopHud();
            }).catch(function (err) {
                console.log("pollintersetting.vue>>err");
                $.stopLoading();
                $.stopHud();
                $.notify(err,0);
            })
        }
    }
</script>