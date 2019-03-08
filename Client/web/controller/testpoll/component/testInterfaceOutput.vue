<template>
    <el-dialog :title="'接口输出: '+obj.interName"  width="80%" ref="box" :visible.sync="showDialog" append-to-body>
        <el-tabs v-model="tabType">
            <el-tab-pane label="General" name="general">
                <el-form label-width="100px" label-position="left">
                    <el-form-item label="Url">
                        {{obj.request.url}}
                    </el-form-item>
                    <el-form-item label="Method">
                        {{obj.request.method}}
                    </el-form-item>
                    <el-form-item label="Status" :style="{color:obj.result.status=='200'?'green':'red'}">
                        {{obj.result.status}}
                    </el-form-item>
                    <el-form-item label="耗时(s)">
                        {{obj.runTime}}
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Request Header" name="request">
                <table class="table-hover" style="width: 100%;table-layout: fixed">
                    <tbody>
                    <template v-for="(value,key) in reqHeader">
                        <tr style="vertical-align: middle;height: 30px" :key="key">
                            <td style="width: 30%;">
                                {{key}}
                            </td>
                            <td style="width: 70%;word-wrap:break-word">
                                {{value}}
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </el-tab-pane>
            <el-tab-pane label="Request Param" name="reqparam" v-if="obj.request.method=='POST'  || obj.request.method=='PUT' || obj.request.method=='PATCH'">
                <table class="table-hover" style="width: 100%;table-layout: fixed" v-if="obj.request.bodyType==0">
                    <tbody>
                    <template v-for="(value,key) in obj.request.form">
                        <tr style="vertical-align: middle;height: 30px;" :key="key">
                            <td style="width: 40%">
                                {{key}}
                            </td>
                            <td style="width: 60%;word-wrap:break-word;">
                                {{value}}
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
				<pre v-else-if="obj.request.bodyType==1 && obj.request.rawType==2">				
					{{JSON.parse(obj.request.body)}}
				</pre>
				<div  style="width: 95%;word-wrap:break-word;"  v-else>
					<pre>{{obj.request.body}}</pre>
				</div>
                
            </el-tab-pane>
            
            <el-tab-pane label="Response Header" name="response">
                <table class="table-hover" style="width: 100%;table-layout: fixed">
                    <tbody>
                    <template v-for="(value,key) in resHeader">
                        <tr style="vertical-align: middle;height: 30px" :key="key">
                            <td style="width: 30%">
                                {{key}}
                            </td>
                            <td style="width: 70%;word-wrap:break-word">
                                {{value}}
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </el-tab-pane>
            <el-tab-pane label="Response Data" name="data">
                <template v-if="type==0">
                    <el-row class="row" style="font-size: 15px;min-height: 25px;line-height: 25px;word-break: break-all" v-html="item" v-for="(item,index) in objData" :key="index">
                    </el-row>
                </template>
                <img :src="objData" v-else-if="type==1">
                <pre v-else>{{objData}}</pre>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<style>

</style>

<script>
    module.exports = {
        props:["interfaceRunInfo"],
        data: function () {
            return {
                showDialog:false,
                obj:this.interfaceRunInfo,
                tabType:"general"
            }
        },
        computed:{
            reqHeader:function () {
                if (this.obj.request.headers) {
                    return JSON.parse(this.obj.request.headers)
                } else {
                    return {}
                }
               
            },
            resHeader:function () {
               if (this.obj.result.headers) {
                    return JSON.parse(this.obj.result.headers)
                } else {
                    return {}
                }
            },
            type:function () {
                if(typeof(this.obj.result.data)=="object" && !(this.obj.result.data instanceof Blob))
                {
                    return 0;
                }
                else if(typeof(this.obj.result.data)=="object" && (this.obj.result.data instanceof Blob))
                {
                    return 1;
                }
                else
                {
                    return 2;
                }
            },
            objData:function () {
                if(this.type==0)
                {
                    var data=JSON.stringify(this.obj.result.data);
                    return helper.format(data,0,[],[]).draw;
                }
                else if(this.type==1)
                {
                    return $.createUrlObject(this.obj.result.data);
                }
                else
                {
                    return this.obj.result.data;
                }
            }
        },
        methods: {

        },
        beforeDestroyed:function () {
            if(this.type==1)
            {
                $.revokeUrlObject(this.objData);
            }
        }
    }
</script>