<template>
    <el-row class="row">
        <table width="100%" id="queryTable">
			<tr style="height: 32px;lineHeight: 32px;textAlign: center;verticalAlign: middle;">
				<td>参数名</td>
				<!-- <td>必选</td> -->
				<td>备注</td>
				<td>参数值</td>
				<td>加密</td>
				<td>
					<el-tooltip class="item" effect="dark" placement="bottom" trigger="hover"  content="实际运行接口是否包含此字段">
						<i class="el-icon-question" style="font-size: 12px;"></i>
					</el-tooltip>
				</td>
			</tr>
            <template v-for="(item,index) in arr">
                <tr :style="{textAlign: 'center',verticalAlign: 'middle',backgroundColor:item.enable?'white':'lightgray'}" :key="index" style="height: 36px;line-height: 36px;">
                    <td style="width: 20%;text-align: center;vertical-align: middle;">
                        <el-input size="small" style="width: 100%;" placeholder="请填写参数名称" v-model="item.name" :disabled="true"></el-input>
                    </td>
                    <!-- <td style="width: 10%;" >
                        <span style="display: inline-block;">
                            {{item.must?"必选":"可选"}}
                        </span>
                    </td> -->
                    <td style="width: 20%;overflow-y: auto;line-height: normal;">
                        {{item.remark?item.remark:"无备注"}}
                    </td>
                    <td style="width: 35%;">
                        <div  style="width: 100%;display: inline-block;" v-if="item.value && (item.value.data.length>0 || item.value.status)">
                            <el-autocomplete size="small" class="inline-input" v-model="item.selValue" :fetch-suggestions="querySearch" placeholder="选择或者填入你的值" @mouseenter.native="focus(item)" :disabled="!item.enable || interfaceObj.example" style="width:100%" popper-class="my-autocomplete">
                                <i class="el-icon-caret-bottom el-input__icon" slot="suffix" @click="showAutoComplete" style="cursor: pointer"></i>
                                <template slot-scope="props">
                                    <div class="value">{{ props.item.value }}</div>
                                    <span class="remark">{{ props.item.remark }}</span>
                                </template>
                            </el-autocomplete>
                        </div>
                        <el-input size="small" v-else style="width: 100%" v-model="item.selValue" :disabled="!item.enable || interfaceObj.example"></el-input>
                    </td>
                    <td style="width: 10%;">
                        <el-button type="text" size="mini"  style="font-size: 13px" @click="encrypt(item)" :disabled="interfaceObj.example">{{(item.encrypt && item.encrypt.type)?item.encrypt.type:"未加密"}}</el-button>
                    </td>
                    <td style="width: 15%">
                        <el-button size="mini" type="text" style="font-size: 15px;" @click="toggleEnable(item,index)" :disabled="interfaceObj.example"><span :class="item.enable?'fa fa-eye':'fa fa-eye-slash'" :title="item.enable?'运行时包含此字段':'运行时不包含此字段'"></span></el-button>
                    </td>
                </tr>
            </template>
        </table>
    </el-row>
</template>
<script>
    module.exports={
        props:["interface","status"],
        data:function () {
            return {
                interfaceObj:this.interface,

                itemSel:null,
            }
        },
        computed:{
            arr:function () {
                return this.interfaceObj.queryParam
            }
        },
        methods:{
            toggleEnable:function (item,index) {
                item.enable=Number(!item.enable);
            },
            encrypt:function (item) {
                if(!item.encrypt)
                {
                    var obj={
                        type:"",
                        salt:"",
                        key:0
                    }
                    Vue.set(item,"encrypt",obj);
                }
                $.showBox(this.$parent,require("component/encrypt.vue"),{
                    "source":item.encrypt
                });
            },
            querySearch:function (queryString,cb) {
                var results=[];
                if(this.itemSel.value.type==0)
                {
                    results=this.itemSel.value.data.map(function (obj) {
                        return {
                            value:obj.value,
                            remark:obj.remark
                        }
                    })
                }
                else
                {
                    if(this.itemSel.value.status)
                    {
                        var objStatus=null;
                        var _this=this;
                        this.status.forEach(function (obj) {
                            if(obj.id==_this.itemSel.value.status)
                            {
                                objStatus=obj;
                            }
                        })
                        if(objStatus)
                        {
                            results=objStatus.data.map(function (obj) {
                                return {
                                    value:obj.key,
                                    remark:obj.remark
                                }
                            })
                        }
                    }
                }
                if(queryString)
                {
                    results=results.filter(function (obj) {
                        return obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    })
                }
                cb(results);
            },
            focus:function (item) {
                this.itemSel=item;
            },
            showAutoComplete:function (event) {
                this.itemSel.selValue="";
                setTimeout(function(){
                    event.target.parentNode.parentNode.parentNode.querySelector("input").focus();
                },100)
            }
        }
    }
</script>
