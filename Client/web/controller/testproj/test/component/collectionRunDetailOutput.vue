<template>
    <el-dialog title="运行集合-输出"  width="80%" ref="box" :visible.sync="showDialog" :close-on-click-modal="false" append-to-body>
        <el-row class="row">
            <el-row class="row">
                总共运行：{{info.total}}， 
                成功：<span style="color: green">{{info.success}}</span>，
                失败：<span style="color: red">{{info.fail}}</span>，
                未判定：<span style="color: orange">{{info.unknown}}</span><br>
                
            </el-row>
            <el-row class="row" v-html="info.output" style="padding: 0px 20px;word-break: break-all;word-wrap: break-word;">
                
            </el-row>
        </el-row>
    </el-dialog>
</template>

<style>

</style>

<script>

/**
 * <el-row class="row">
                总共运行：{{info.output.total}}， 
                成功：<span style="color: green">{{info.output.success}}</span>，
                失败：<span style="color: red">{{info.output.fail}}</span>，
                未判定：<span style="color: orange">{{info.output.unknown}}</span><br>
                一共耗时(s):{{(info.output.time/1000).toFixed(3)}}，
                平均耗时(s):{{info.output.total==0?"0.000":(info.output.time/1000/info.output.total).toFixed(3)}}
            </el-row>
 * <el-row class="row" v-for="(output,index) in arr" :key="index" v-html="output" style="padding: 0px 20px;word-break: break-all;word-wrap: break-word;">
                
            </el-row>
 * 
 */
    module.exports = {
        props:["info"],
        data: function () {
            return {
                showDialog:false,

                // arr:function (data) {
                //     console.log("data")
                //     console.log(data)
                //     var arr=[];
                //     data.forEach(function (obj) {
                //         console.log("obj")
                //         console.log(obj)
                //         arr.push(obj.output)
                //     })
                //     if(arr.length==0)
                //     {
                //         arr.push({
                //             "output": ""
                //         })
                //     }
                //     return arr;
                // }.call(this,this.info.tests)
            }
        },
        computed:{
            
        },
        methods: {
            
        }
    }
</script>