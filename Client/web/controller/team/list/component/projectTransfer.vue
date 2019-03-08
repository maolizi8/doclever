<template>
    <el-dialog title="指定项目所有者" width="50%" ref="box" :visible.sync="showDialog" append-to-body>
        <el-row class="row" style="text-align: center;height: 50px;line-height: 50px">
            <el-input size="small" style="width: 100%" placeholder="请输入你要筛选的用户名" v-model="searchName"></el-input>
        </el-row>
        <el-row class="row" style="height: 300px;overflow-y: auto">
            <el-collapse>
                <template v-for="(item,index) in arrFilter">
                    
                            <el-row class="row" style="height: 36px;line-height: 36px;text-align: center;border-bottom:1px solid #cccccc" :key="index">
                                <el-col class="col" :span="3">
                                   <i class="fa fa-user-circle" aria-hidden="true" style="font-size:18px;color: #17B9E6;"></i>
                                </el-col>
                                <el-col class="col" :span="9">
                                    {{item.user.name}}
                                </el-col>
                                <el-col class="col" :span="6">
                                    <template v-if="item.select==1">
                                        <span v-if="item.role==0">
                                            项目管理员
                                        </span>
                                        <span v-else-if="item.role==1">
                                            项目观察者
                                        </span>
                                        <span v-else>
                                            项目所有者
                                        </span>
                                    </template>
                                    <span v-else>
                                        非项目成员
                                    </span>
                                </el-col>
                                <el-col class="col" :span="3">
                                    <el-button  style="font-size: 15px" size="mini" @click="transfer(item)" type="text" v-if="item.role==0 || item.role==1">转让</el-button>
                                </el-col>
                            </el-row>
                        
                </template>
            </el-collapse>
        </el-row>
    </el-dialog>
</template>

<script>
/**
 <template v-for="(item,index) in arrFilter">
                    <el-collapse-item :title="item.name" class="hover" :key="index">
                        <template v-for="(item1,index1) in item.users">
                            <el-row class="row" style="height: 40px;line-height: 40px;text-align: center" :key="index1">
                                <el-col class="col" :span="3">
                                    <img v-proxy="item1.user.photo" style="width: 30px;height: 30px; border-radius:50%;vertical-align: middle">
                                </el-col>
                                <el-col class="col" :span="9">
                                    {{item1.user.name}}
                                </el-col>
                                <el-col class="col" :span="6">
                                    <template v-if="item1.select==1">
                                        <span v-if="item1.role==0">
                                            项目管理员
                                        </span>
                                        <span v-else-if="item1.role==1">
                                            项目观察者
                                        </span>
                                        <span v-else>
                                            项目所有者
                                        </span>
                                    </template>
                                    <span v-else>
                                        非项目成员
                                    </span>
                                </el-col>
                                <el-col class="col" :span="3">
                                    <el-button  style="font-size: 15px" size="mini" @click="transfer(item1)" type="text" v-if="item1.role==0 || item1.role==1">转让</el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-collapse-item>
                </template>
 */
    var proxyImg=require("common/director/proxyImg")
    module.exports={
        props:["arr","id","type"],
        data:function () {
            return {
                searchName:"",
                arrUser:this.arr,
                savePending:false,
                arrUserSearch:[],
                showDialog:false
            }
        },
        computed:{
            arrFilter:function () {
                if(!this.searchName)
                {
                    return this.arrUser;
                }
                // console.log("teamProjectUser>arrFilter>this.arrUser")
                // console.log(this.arrUser)
                this.arrUserSearch=[];
                var _this=this;
                

                    var objCopy=$.clone(this.arrUser);
                    objCopy=objCopy.filter(function (obj) {
                        
                        if(obj.user.name.toLowerCase().indexOf(_this.searchName.toLowerCase())>-1)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    })
                    // console.log("teamProjectUser>arrFilter>objCopy")
                    // console.log(objCopy)
                    if(objCopy.length>0)
                    {
                        //this.arrUserSearch.push(objCopy);
                        _this.arrUserSearch=objCopy;
                    }
                
                // console.log("teamProjectUser>arrFilter>this.arrUserSearch")
                // console.log(this.arrUserSearch)
                return this.arrUserSearch;
            }
            
        },
        directives:{
            proxy:proxyImg
        },
        methods:{
            transfer:function (item) {
                var _this=this;
                $.confirm("是否确认将该项目转让给用户"+item.user.name,function () {
                    $.startHud();
                    var pro;
                        pro=net.put("/project/owner",{
                            id:_this.id,
                            user:item.user._id
                        })
                    // if(_this.type=="category")
                    // {
                    //     pro=net.put("/project/owner",{
                    //         id:_this.id,
                    //         user:item.user._id
                    //     })
                    // }
                    // else if(_this.type=="doc")
                    // {
                    //     pro=net.put("/doc/owner",{
                    //         project:_this.id,
                    //         user:item.user._id
                    //     })
                    // }
                    // else if(_this.type=="test")
                    // {
                    //     pro=net.put("/test/owner",{
                    //         project:_this.id,
                    //         user:item.user._id
                    //     })
                    // }
                    pro.then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            _this.showDialog=false;
                            $.notify("转让成功",1);
                            if(item.select==1)
                            {
                                _this.$emit("userMinus")
                            }
                        }
                        else
                        {
                            $.notify(data.msg,0)
                        }
                    })
                })
            }
        }
    }
</script>