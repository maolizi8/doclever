<template>
    <el-row class="row">
        <table width="100%">
            <template v-for="(item,index) in arr">
                <tr style="height: 36px;line-height: 36px;text-align: center;vertical-align: middle" :style="{backgroundColor:item.enable?'white':'lightgray'}" :key="index" >
                    <td style="width: 20%;">
                        <el-input size="small" style="width:100%;" placeholder="请填写参数名称" v-model="item.name" :disabled="true"></el-input>
                    </td>
                    <td style="width: 30%">
                        <el-autocomplete size="small" style="width: 100%;" class="inline-input" placeholder="请填写value" v-model="item.value" :fetch-suggestions="querySearchValue" @mouseenter.native="focus(item)" :disabled="interfaceObj.example"></el-autocomplete>
                    </td>
                    <td style="width: 30%;line-height: normal;">
                        {{item.remark?item.remark:"无备注"}}
                    </td>
                    <td style="width: 10%;">
                        <el-button type="text" size="mini" style="font-size: 13px" @click="encrypt(item)" :disabled="interfaceObj.example">
                            {{(item.encrypt && item.encrypt.type)?item.encrypt.type:"未加密"}}
                            </el-button>
                    </td>
                    <td style="width: 10%">
                        <el-button size="mini" type="text" style="font-size: 15px;" @click="toggleEnable(item,index)" :disabled="interfaceObj.example">
                            <span :class="item.enable?'fa fa-eye-slash':'fa fa-eye'" :title="item.enable?'发送时不包含此字段':'发送时包含此字段'">
                                </span>
                                </el-button>
                    </td>
                </tr>
            </template>
        </table>

    </el-row>
</template>
<script>
    var headerData=require("common/js/header.js")
    module.exports={
        props:["interface"],
        data:function () {
            return {
                interfaceObj:this.interface,

                keys:Object.keys(headerData).map(function (obj) {
                    return {value:obj}
                }),
                itemSel:null
            }
        },
        computed:{
            arr:function () {
                return this.interfaceObj.header
            }
        },
        methods:{
            focus:function (item) {
                this.itemSel=item;
            },
            toggleEnable:function (item,index) {
                item.enable=Number(!item.enable);
            },
            querySearchKey:function(queryString, cb) {
                var results;
                if(queryString)
                {
                    results=this.keys.filter(function (obj) {
                        return obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    })
                }
                else
                {
                    results=this.keys;
                }
                cb(results);
            },
            querySearchValue:function(queryString, cb) {
                var results;
                if(headerData[this.itemSel.name])
                {
                    results=headerData[this.itemSel.name].map(function (obj) {
                        return {value:obj}
                    })
                }
                else
                {
                    cb([]);
                    return;
                }
                if(queryString)
                {
                    results=results.filter(function (obj) {
                        return obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    })
                }
                cb(results);
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
                    "source":item.encrypt,
                    "notKey":1
                });
            }
        },
    }
</script>
