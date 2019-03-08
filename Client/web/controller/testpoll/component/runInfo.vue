<template>
    <el-dialog :title="pollRunInfo.projectName+'/'+pollRunInfo.collectionName"  width="95%" ref="box" :visible.sync="showDialog" append-to-body>
        
        <el-row class="row box-shadow" style="">
            <!-- <el-row class="row" style="height:40px;line-height: 40px;padding-left: 10px;font-size: 14px;color: #17B9E6">
                {{ pollRunInfo.projectName}}/{{pollRunInfo.collectionName}}
            </el-row>
            <el-row class="row" style="height: 1px;background-color: lightgray"></el-row> -->

            <el-row class="row" style="border-bottom-left-radius: 5px;border-bottom-right-radius: 5px">
                <el-row class="row" style="height: 30px;line-height: 30px;text-align: center;background-color: #ebebeb" :style="{paddingRight:paddingRight+'px'}">
                    <el-col class="col" :span="5">
                        测试模块/业务
                    </el-col>
                    <el-col class="col" :span="3">
                        测试用例
                    </el-col>
                    <el-col class="col" :span="1">
                        状态
                    </el-col>
                    <el-col class="col" :span="15">
                        接口运行情况
                    </el-col>
                    <!-- <el-col class="col" :span="4">
                        日志
                    </el-col> -->
                </el-row>
                <el-row class="row" style="overflow-y: auto;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px" id="">
                    <el-row class="row" style="line-height: 30px;text-align: center;border-bottom: 1px solid #ccc;" v-for="(item,index) in runTestsArr" :key="index" >
                        <el-col class="col" :span="5" style="overflow: hidden;text-overflow:ellipsis;">
                            <el-tooltip class="item" effect="dark" :content="item.testModule+'/'+item.testGroup" placement="bottom">
                                <span>{{item.testModule}}/{{item.testGroup}}</span>
                            </el-tooltip>
                        </el-col>
                        <el-col class="col" :span="3" style="overflow: hidden;text-overflow:ellipsis;">
                            {{item.testName}}
                        </el-col>
                        <el-col class="col" :span="1">
                            <i class="el-icon-question" style="color: gray" v-if="item.status==0"></i>
                            <i class="el-icon-success" style="color: green" v-else-if="item.status==1"></i>
                            <i class="el-icon-error" style="color: red" v-else-if="item.status==2"></i>
                        </el-col>
                        <el-col class="col" :span="15" style="text-align:left;">
                            <span v-for="(inter,index) in item.interfaces" :key="index" style="">
                                {{inter.interBaseUrl}}/{{inter.interPath}}<span v-if="inter.runTime">(耗时：<span style="color:green">{{inter.runTime}}</span>秒)</span>
                                <span style="color:red" v-if="inter.errMessage">（{{inter.errMessage}}）</span> <br> 
                            </span>
                        </el-col>
                        <!-- <el-col class="col" :span="4">
                            日志
                        </el-col> -->
                    </el-row>
                </el-row>
            </el-row>
        </el-row>
        
        <el-row class="dialog-footer" slot="footer">
            <el-button size="mini" type="primary" @click="showDialog=false" :loading="savePending">
                关闭
            </el-button>
        </el-row>
    </el-dialog>
</template>

<style scoped>
    
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;height: 66%;
    }
</style>

<script>
    
    module.exports={
        props:["pollRunInfo"],
        data:function () {
            return {
                runTestsArr:this.pollRunInfo.tests?this.pollRunInfo.tests:[],
                showDialog:false
            }
        },
        directives:{
            
        },
        computed:{
            
        },
        methods:{
            changeBaseUrl:function () {
                
            }
        },
        created:function () {
           
        }
    }
</script>