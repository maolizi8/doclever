<template>
    <el-row class="row">
        <el-row class="row appendHead" style="">
            <el-col class="col" style="text-align: center;width: 30px;" @click.native="toggle">
                <i :class="expand1?'el-icon-caret-bottom':'el-icon-caret-right'" style="color: gray"></i>
            </el-col>
            <el-col class="col appendbody" style="">
                <el-col class="col" :span="16" style="text-align: left" @click.native="toggle">
                    <slot name="title"></slot>
                </el-col>
                <el-col class="col" :span="8" style="text-align: right">
                    <slot name="append"></slot>
                </el-col>
            </el-col>
        </el-row>
        <el-collapse-transition>
            <div v-show="expand1">
                <el-row class="row expand_slot" style="padding:10px" >
                    <slot></slot>
                </el-row>
            </div>
        </el-collapse-transition>
    </el-row>
</template>
<style>
	.appendHead{
		height: 40px;line-height: 40px;
		cursor: pointer;
		background-color:#ededed;
		border-bottom:1px solid #cccccc;
	}
    .appendbody{
        width: calc(100% - 30px);
        
    }

    .expand_slot {

    }
</style>
<script>
    module.exports={
        props:["expand"],
        data:function () {
            return {
                expand1:this.expand?this.expand:0
            }
        },
        methods:{
            toggle:function () {
                this.expand1=!this.expand1;
            },
            setExpand:function (val) {
                this.expand1=val;
            }
        }
    }
</script>