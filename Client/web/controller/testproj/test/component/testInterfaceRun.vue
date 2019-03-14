<template>
    <el-dialog title="用例-编辑接口" style="" :visible.sync="showDialog" width="80%" ref="box" :close-on-click-modal="false" append-to-body id="testInterfacePop">
         <el-row class="row line-36">
            <el-col class="col" :span="2">
                <span style="color:red;">*</span>选择接口
            </el-col>
            <el-col class="col" :span="22">
                <el-cascader size="small" expand-trigger="hover" :options="arrInterface" v-model="arrSelInterface" style="width: 95%" :show-all-levels="true" filterable clearable @change="changeInterface" placeholder="请选择接口（团队/项目/分支/分组/接口名）" :props="props">
                </el-cascader>
            </el-col>
        </el-row>
        <el-row class="row line-36">
            <el-col class="col" :span="2">
                用例名称
            </el-col>
            <el-col class="col" :span="22">
                <el-input size="small" style="width: 95%" placeholder="请填入用例名称" v-model="objInterface.name"></el-input>
            </el-col>
            
        </el-row>
        <el-row class="row line-36">
            <el-col class="col" :span="2">
                请求方法
            </el-col>
            <el-col class="col" :span="10">
                <el-input size="small" style="width: 90%" v-model="objInterface.method" :disabled="true"></el-input>
            </el-col>
            <el-col class="col" :span="2">
                状态
            </el-col>
            <el-col class="col" :span="10">
                {{objInterface.finish==1?"已完成":(objInterface.finish==2?"已废弃":"未完成")}}
            </el-col>
        </el-row>
        <el-row class="row line-36">
            <el-col class="col" :span="2">
                baseUrl
            </el-col>
            <el-col class="col" :span="10">
                <el-input size="small" style="width: 90%" v-model="objInterface.baseurl" :disabled="true"></el-input>
            </el-col>
            <el-col class="col" :span="2">
                路径
            </el-col>
            <el-col class="col" :span="10">
                <el-input size="small" style="width: 90%" v-model="objInterface.url" :disabled="true"></el-input>
            </el-col>
        </el-row>
        <el-row class="row" style="height: 60px;line-height: 60px;">
            <el-col class="col" :span="2">
                备注
            </el-col>
            <el-col class="col" :span="22">
                <el-input size="small" type="textarea" :rows="2" style="width: 95%" v-model="objInterface.remark" :disabled="true"></el-input>
            </el-col>
        </el-row>
        <el-row class="row line-36">
            <el-col class="col" :span="2">
                注入
            </el-col>
            <el-col class="col" :span="22">
                <el-checkbox v-model="pullInject" :true-label="1" :false-label="0">
                    降低动态注入优先级
                </el-checkbox>
            </el-col>
        </el-row>
		
		<el-row class="row box-shadow" style="padding-left: 10px;padding-bottom: 20px;margin-top: 10px">
			<el-row style="font-size: 14px;padding: 5px;border-bottom: 1px solid #ccc;" v-if="objInterface._id">
				<span style="font-weight: bold;">切换实例:&nbsp;</span>
				<el-select v-model="exampleId"  style="300px;" @change="changeExample" >
					<!-- <el-option value="" label="无运行实例"></el-option> -->
					<el-option v-for="(item,index) in queryInterfaceExample"  :value="item.id" :label="item.value" :key="index" ></el-option>
				</el-select>
			</el-row>
			<el-tabs type="card" style="background-color: white;border-radius: 5px;" v-model="tabIndex" id="mainTest">
				<template v-for="(item, index) in originInterface.param">
					<el-tab-pane :key="item.id" :name="index">
						<span slot="label">
							<el-popover placement="bottom" width="200" trigger="hover" :content="item.remark" v-if="item.remark">
								<span slot="reference">{{item.name}}</span>
							</el-popover>
							<span v-else>{{item.name}}</span>&nbsp;
						</span>
						<el-row class="row">
							<el-tabs type="card">
								<el-tab-pane :label="paramTab" v-if="param.length>0">
									<testrestparam :interface="item" :status="status"></testrestparam>
								</el-tab-pane>
								<el-tab-pane :label="queryTab">
									<testquery :interface="item" :status="status"></testquery>
								</el-tab-pane>
								<el-tab-pane :label="headerTab">
									<testheader :interface="item"></testheader>
								</el-tab-pane>
								<el-tab-pane :label="bodyTab" v-if="objInterface.method=='POST' || objInterface.method=='PUT' || objInterface.method=='PATCH'">
									<testbody :interface="item" :status="status"></testbody>
								</el-tab-pane>
								<el-tab-pane label="Inject">
									<testinject :interface="item"></testinject>
								</el-tab-pane>
							</el-tabs>
						</el-row>
					</el-tab-pane>
				</template>
			</el-tabs>
		</el-row>
        <!-- <div style="position: absolute;top: 304px;right: 40px;z-index: 1000;font-size: 14px" v-if="objInterface._id">
            切换实例:&nbsp;
            <el-autocomplete size="mini" v-model="exampleName" :fetch-suggestions="querySearchExample" placeholder="筛选你的运行实例" @select="changeExample">
				<i class="el-icon-caret-bottom el-input__icon"></i>
			</el-autocomplete>
        </div>
        <el-tabs type="card" style="background-color: white;padding: 10px;margin-top: 15px;border-radius: 5px;border: 1px solid #888;box-shadow: 0px 2px 2px #888888;" v-model="tabIndex" id="mainTest">
            <template v-for="(item, index) in originInterface.param">
                <el-tab-pane :key="item.id" :name="index">
                    <span slot="label">
                        <el-popover placement="bottom" width="200" trigger="hover" :content="item.remark" v-if="item.remark">
                            <span slot="reference">{{item.name}}</span>
                        </el-popover>
                        <span v-else>{{item.name}}</span>&nbsp;
                    </span>
                    <el-row class="row">
                        <el-tabs type="card">
                            <el-tab-pane :label="paramTab" v-if="param.length>0">
                                <testrestparam :interface="item" :status="status"></testrestparam>
                            </el-tab-pane>
                            <el-tab-pane :label="queryTab">
                                <testquery :interface="item" :status="status"></testquery>
                            </el-tab-pane>
                            <el-tab-pane :label="headerTab">
                                <testheader :interface="item"></testheader>
                            </el-tab-pane>
                            <el-tab-pane :label="bodyTab" v-if="objInterface.method=='POST' || objInterface.method=='PUT' || objInterface.method=='PATCH'">
                                <testbody :interface="item" :status="status"></testbody>
                            </el-tab-pane>
                            <el-tab-pane label="Inject">
                                <testinject :interface="item"></testinject>
                            </el-tab-pane>
                        </el-tabs>
                    </el-row>
                </el-tab-pane>
            </template>
        </el-tabs> -->
        <el-row class="dialog-footer" slot="footer">
			<el-checkbox v-model="clearManuParams" :true-label="1" :false-label="0" v-if="isEditPop">
				是否清空接口的“入参”
			</el-checkbox>
            <el-button type="primary" size="mini" @click="save">
                保存
            </el-button>
        </el-row>
    </el-dialog>
</template>
<style>
    .el-tabs.el-tabs--card.el-tabs--top{
        padding: 5px;
    }
    .el-cascader__label {
        top:0;
    }
    #mainTest>.el-tabs__content
    {
        padding: 0 10px 10px 10px;
        border-left: 1px lightgray solid;
        border-right: 1px lightgray solid;
        border-bottom: 1px lightgray solid;
    }
    .line-36{
        height: 36px;
        line-height: 36px;
        /* text-align: center */
        }
	#testInterfacePop>.el-dialog{
		margin-top: 15px;
	}
	#testInterfacePop>.el-dialog>.el-dialog__body {
		padding: 10px 20px;
		height: calc(100vh - 180px);
		overflow-y: scroll;
		border-top: 1px solid rgba(204,204,204,0.6);
		border-bottom: 1px solid rgba(204,204,204,0.6);
	}

    /*
     <el-row class="row" style="height: 50px;line-height: 50px;text-align: center">
    */
</style>

<script>
    var testRestParam=require("./testRestParam.vue");
    var testQuery=require("./testQuery.vue");
    var testHeader=require("./testHeader.vue");
    var testBody=require("./testBody.vue");
    var testInject=require("./testInject.vue");
    module.exports={
        props:["interface","url","status","index","netInterface","interfaceList"],
        data:function () {
            return {
				isEditPop:this.interface?1:0,
				clearManuParams:0,
				queryInterfaceExample:[],
                arrSelInterface:function () {
                    if(this.interface)
                    {
                        var val=this.interface._id;
                        //var arr=this.$store.state.interfaceList;
                        var arr=this.interfaceList;
                        var ret=[];
                        (function _map(arr) {
                            for(var i=0;i<arr.length;i++)
                            {
                                var obj=arr[i];
                                ret.push(obj._id);
                                if(obj._id==val)
                                {
                                    return true;
                                }
                                else if(obj.data)
                                {
                                    var v=arguments.callee(obj.data);
                                    if(v)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        ret.pop();
                                    }
                                }
                                else
                                {
                                    ret.pop();
                                }
                            }
                            return false;
                        })(arr)
                        if(ret.length>0)
                        {
                            return ret;
                        }
                        else
                        {
                            $.tip("接口已不存在",0);
                            return [];
                        }
                    }
                    else
                    {
                        return []
                    }
                }.call(this),
                arrUrl:function () {
                    return this.url
                }.call(this),
                objInterface:function () {

                    if(this.interface)
                    {
                        return this.interface
                    }
                    else
                    {
                        return {
                            restParam:[],
                            queryParam:[],
                            header:[],
                            bodyParam:[],
                            before:{
                                mode:0,
                                code:""
                            },
                            after:{
                                mode:0,
                                code:""
                            },
                            encrypt:{
                                type:"",
                                salt:""
                            }
                        };
                    }
                }.call(this),
                originInterface:function () {
                    console.log('testproj>test>component>testinterfacerun.vue>originInterface(this.netInterface)')
                    console.log(this.netInterface)

                    if(this.netInterface)
                    {
                        return this.netInterface
                    }
                    else
                    {
                        return {
                            param:[
                                {
                                    restParam:[],
                                    queryParam:[],
                                    header:[],
                                    bodyParam:[],
                                    before:{
                                        mode:0,
                                        code:""
                                    },
                                    after:{
                                        mode:0,
                                        code:""
                                    }
                                }
                            ]
                        };
                    }
                }.call(this),

                // baseurl:function () {
                //     console.log('testproj>test>component>testinterfacerun.vue>this.originInterface')
                //     console.log(this.originInterface)
                //     return this.originInterface.baseurl
                //     // if(this.interface && this.interface.baseUrl)
                //     // {
                //     //     return this.interface.baseUrl
                //     // }
                //     // else
                //     // {
                //     //     return "defaultUrl";
                //     // }
                // }.call(this),
                showDialog:false,
                tabIndex:this.index,
                pullInject:(this.interface && this.interface.pullInject)?1:0,
                props:{
                    value:"_id",
                    label:"name",
                    children:"data"
                },
                example:(this.interface && this.interface.example)?this.interface.example:"",
                exampleName:"无运行实例",
				exampleId:""
            }
        },
        components:{
            "testrestparam":testRestParam,
            "testquery":testQuery,
            "testheader":testHeader,
            "testbody":testBody,
            "testinject":testInject
        },
        watch:{
            tabIndex:{
                handler:function (val,oldValue) {
                    if(!this.objInterface._id)
                    {
                        return;
                    }
                    var _this=this;
                    
                    var obj=this.originInterface.param[parseInt(val)];
                    if(obj.example)
                    {
                        this.exampleName=obj.example.name;
						this.exampleId=obj.example._id;
                    }
                    else
                    {
                        this.exampleName="无运行实例";
						this.exampleId="";
                    }
                    if(oldValue===undefined && this.example)
                    {
                        net.get("/example/list",{
                            interface:this.objInterface._id,
                            paramid:obj.id
                        }).then(function (data) {
                            var results=data.data;
                            results=results.map(function (obj) {
                                return {
                                    id:obj._id,
                                    value:obj.name
                                }
                            })
                            results.unshift({
                                value:"无运行实例",
                                id:""
                            })
                            results.forEach(function (o) {
                                if(o.id==_this.example)
                                {
                                    bFind=true;
                                    _this.exampleName=o.value;
									_this.exampleId=o.id;
                                    Vue.set(obj,"example",{
                                        id:o.id,
                                        name:o.value
                                    })
                                }
                            })
                        })
                    }
                },
                immediate:true
            }
        },
        computed:{
			queryInterfaceExample:function () {

                console.log("testproj>test>component>testInterfaceRun.vue>queryInterfaceExample")
                console.log(this.$store.state.queryInterfaceExample)

                return this.$store.state.queryInterfaceExample
            },
            arrInterface:function () {

                console.log("testproj>test>component>testInterfaceRun.vue>arrinterface")
                console.log("this.interfaceList:")
                console.log(this.interfaceList)

                //return this.$store.state.interfaceList
                return this.interfaceList;
            },
            paramTab:function () {
                return "Param ("+this.param.length+")";
            },
            queryTab:function () {
                return "Query ("+this.querySave.length+")";
            },
            headerTab:function () {
                return "Header ("+this.headerSave.length+")";
            },
            bodyTab:function () {
                return "Body ("+((this.objInterface.bodyInfo && this.objInterface.bodyInfo.type==0)?this.bodySave.length:"Raw")+")";
            },
            param:function () {
                return this.objInterface.restParam
            },
            querySave:function () {
                return this.originInterface.param[parseInt(this.tabIndex)].queryParam.filter(function (obj) {
                    if(obj.name && obj.enable)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                })
            },
            headerSave:function () {
                return this.originInterface.param[parseInt(this.tabIndex)].header.filter(function (obj) {
                    if(obj.name)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                });
            },
            bodySave:function () {
                return this.originInterface.param[parseInt(this.tabIndex)].bodyParam.filter(function (obj) {
                    if(obj.name && obj.enable)
                    {
                        return true
                    }
                    else
                    {
                        return false
                    }
                })
            },
        },
        methods:{
            changeInterface:function () {
                $.startHud();
                var _this=this;

                console.log("testproj>test>component>testInterfaceRun.vue>changeInterface")
                console.log('this.objInterface')
                console.log(this.objInterface)

                this.$store.dispatch("showInterface",{
                    id:this.arrSelInterface[this.arrSelInterface.length-1],
                    interface:this.objInterface,
                    status:this.status,
                    baseUrls:this.arrUrl
                }).then(function (data) {
                    $.stopHud();
                    console.log("testproj>test>component>testInterfaceRun.vue>changeInterface>showInterface>data")
                    console.log(data)
                    if(data.code==200)
                    {
                        _this.originInterface=data.data.interface;
                        _this.tabIndex="0";
                        for(var key in _this.originInterface)
                        {
                            if(key!="param")
                            {
                                _this.objInterface[key]=_this.originInterface[key];
                            }
                        }
                        var obj=_this.originInterface.param[0];
                        for(var key in obj)
                        {
                            if(key!="name" && key!="id" && key!="remark")
                            {
                                _this.objInterface[key]=obj[key];
                            }
                        }
                        console.log("testproj>test>component>testInterfaceRun.vue>changeInterface>_this.originInterface")
                        console.log(_this.originInterface)
                        console.log("testproj>test>component>testInterfaceRun.vue>changeInterface>_this.objInterface")
                        console.log(_this.objInterface)
						_this.initExample();//gql add
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            save:function () {
                if(!this.objInterface.id)
                {
                    $.tip("请选择接口",0);
                    return
                }
                var obj1=this.originInterface.param[parseInt(this.tabIndex)];
                for(var key in obj1)
                {
                    if(key!="name" && key!="id" && key!="remark")
                    {
                        this.objInterface[key]=obj1[key];
                    }
                }
                console.log('testInterfaceRun.vue>save>this.originInterface')
                console.log(this.originInterface)
                this.objInterface.baseurl=this.originInterface.baseurl;

                var obj=$.clone(this.objInterface);
                obj.pullInject=this.pullInject;
                obj.paramId=this.originInterface.param[parseInt(this.tabIndex)].id;
                if(this.originInterface.param[parseInt(this.tabIndex)].example)
                {
                    obj.example=this.originInterface.param[parseInt(this.tabIndex)].example.id;
                    this.exampleName=this.originInterface.param[parseInt(this.tabIndex)].example.name;
                }
                else
                {
                    delete obj.example
                }
                delete obj.param;
                console.log('testInterfaceRun.vue>save>this.exampleName')
                console.log(obj.example)
                console.log(this.exampleName)
				//obj,obj.example?this.exampleName:"",
                this.$emit("save",obj,obj.example?this.exampleName:"",this.clearManuParams);
                this.showDialog=false;
            },
            querySearchExample:function (queryString,cb) {
                net.get("/example/list",{
                    interface:this.objInterface._id,
                    paramid:this.originInterface.param[parseInt(this.tabIndex)].id
                }).then(function (data) {
                    var results=data.data;
                    results=results.map(function (obj) {
                        return {
                            id:obj._id,
                            value:obj.name
                        }
                    })
                    results.unshift({
                        value:"无运行实例",
                        id:""
                    })
                    cb(results);
                })
            },
            initExample:function(){
                var _this=this;
                _this.exampleName="无运行实例";
				_this.exampleId="";
				_this.queryInterfaceExample=[{
                        value:"无运行实例",
                        id:""
                    }]
                // console.log("testproj>test>component>testInterfaceRun.vue>initExample>_this.originInterface")
                // console.log(_this.originInterface)
                // console.log("testproj>test>component>testInterfaceRun.vue>initExample>_this.objInterface")
                // console.log(_this.objInterface)
				net.get("/example/list",{
					interface:this.objInterface._id,
					paramid:this.originInterface.param[parseInt(this.tabIndex)].id
				}).then(function (data) {
                    if(data.code==200)
                    {
                        var results=data.data;
                        // console.log("testproj>test>component>testInterfaceRun.vue>initExample>results")
                        // console.log(results)
                        results=results.map(function (obj) {
                            return {
                                id:obj._id,
                                value:obj.name
                            }
                        })
                        for(var obj of results){
                            _this.queryInterfaceExample.push(obj)
                        }
                    }
                    else
                    {
                        console.log("testproj>test>component>testInterfaceRun.vue>initExample>error")
				        console.log(data.msg)
                        $.notify(data.msg,0)
                    }
                    
				})
			},
			changeExample:function (id) {
				// console.log("testproj>test>component>testInterfaceRun.vue>changeExample>id")
				// console.log(id)
                var _this=this;
                $.startHud();
                this.$store.dispatch("changeExample", {
                    id: id,
                    objInterface: this.objInterface,
                    objOriginal: this.originInterface.param[parseInt(this.tabIndex)]
                }).then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        $.notify("切换成功",1);
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                });
            },
        },
		created:function(){
            if (this.objInterface._id) {
                 this.initExample();
            }
		}
    }
</script>










