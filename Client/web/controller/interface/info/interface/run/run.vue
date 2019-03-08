<template>
    <el-row class="row" id="run">
        <el-row class="row" style="height: 35px;line-height: 35px">
            <el-button size="mini" type="text" icon="fa fa-arrows-alt" style="margin-left: 5px;font-size: 15px" title="放大/缩小" @click="$store.getters.event.$emit('toggleMax')"></el-button>
            <el-button type="primary" size="mini" style="margin-top: 4px;margin-right: 0px;margin-left: 5px" @click="$store.dispatch('info/interface/changeType',interfaceEditRole?'edit':'preview',{root:true})">
                返回
            </el-button>
            <el-button type="primary" size="mini" style="margin-top: 4px;margin-right: 0px;margin-left: 5px" @click="run" title="立即运行" id="run" :loading="runPending">
                立即运行
            </el-button>
            <span style="color:red;font-size:12px;">
                点击“立即运行”按钮前，请先确定自己电脑所配置的环境是测试环境还是线上环境！！！
            </span>

            <el-button type="primary" size="mini" style="float: right;margin-top: 4px;margin-right: 5px;margin-left: 0px"  v-if="interfaceEditRole" @click="joinTest">
                <i class="fa fa-plus"></i> 加入用例
            </el-button>
            <el-button type="primary" size="mini" style="float: right;margin-top: 4px;margin-right: 5px;margin-left: 0px" v-if="interfaceEditRole" @click="save" title="生成文档" id="save">
                生成
            </el-button>
        </el-row>
        <el-row class="row" id="interfaceMainBody" style="">
            <el-row class="row" style="padding-left: 10px;margin-top: 10px">
                接口路径 [请求方式-baseurl-路径]: 
               <!--  <span style="color: #17b9e6;font-size: 12px" v-popover:popover1>
                    (内网环境?)
                </span> 
				<el-popover ref="popover1" placement="bottom" width="400" trigger="hover">
                    <span style="display: inline-block;font-size: 13px">
                对于内网测试的用户，如果DOClever的服务器和你接口服务器在同一个内网下，请确保右上角个人头像下拉菜单里的Proxy处于关闭状态，即可直接运行接口，否则请先在测试机上安装node环境（安装包点击下载：<a href="/html/web/resource/other/node.msi" target="_blank">window</a>&nbsp;&nbsp;<a href="/html/web/resource/other/node.pkg" target="_blank">mac</a>），然后将<a href="/html/web/resource/other/net.js" target="_blank">net.js</a>(和mock数据是同一个文件)保存到本地，用node运行,然后确保右上角个人头像下拉菜单里的Proxy处于开启状态，即可用本页面进行内网数据调试!
					</span>
                </el-popover>
				-->
            </el-row>

            <el-row class="row" style="height: 40px;line-height: 40px;padding-left: 10px;padding-right: 10px">
                <el-col class="col" :span="3">
                    <el-select size="small" v-model="interfaceObj.method" @input="changeMethod" id="method"  class="param-input"  >
                        <el-option  value="GET" label="GET"></el-option>
                        <el-option  value="POST" label="POST"></el-option>
                        <el-option  value="PUT" label="PUT"></el-option>
                        <el-option  value="DELETE" label="DELETE"></el-option>
                        <el-option  value="PATCH" label="PATCH"></el-option>
                    </el-select>
                </el-col>
                <el-col class="col" :span="7">
                    <el-input size="small"  class="param-input"  placeholder="请填入根路径" v-model.trim="interfaceObj.baseurl" @input="changeBaseUrl"  @paste.native="paste_baseurl"></el-input>
                </el-col>
                <el-col class="col" :span="14">
                    <el-input size="small" class="param-input"  placeholder="请填入你请求的路由地址" v-model.trim="interfaceObj.url" @input="changeUrl" @paste.native="paste"></el-input>
                </el-col>
            </el-row>
            
			<el-row class="row box-shadow" style="padding-left: 10px;margin-top: 10px">
				<el-row style="font-size: 14px;padding: 5px;border-bottom: 1px solid #ccc;" v-if="interfaceObj._id && !curParam.unSave">
					<span style="font-weight: bold;">切换实例:&nbsp;</span>
					<el-select v-model="curParam.selExample.id"  style="200px;" @change="changeExample" >
						<!-- <el-option value="" label="无运行实例"></el-option> -->
						<el-option v-for="(item,index) in queryInterfaceExample"  :value="item.id" :label="item.value" :key="index" ></el-option>
					</el-select>
					<!-- <el-autocomplete size="mini" style="margin-right:10px;width:200px;"
					v-model="curParam.selExample.value" :fetch-suggestions="querySearchExample" 
					placeholder="筛选你的运行实例" @select="changeExample">
					</el-autocomplete> -->
					
					<el-button type="text" size="mini" @click.native="saveExample" v-if="curParam.selExample.id">
						保存
					</el-button>
					<el-button type="text" size="mini" @click.native="renameExample" v-if="curParam.selExample.id">重命名</el-button>
					<el-button type="text" size="mini" @click.native="saveAsExample">另存为</el-button>
					<el-button type="text" size="mini" @click.native="renameExample" v-if="curParam.selExample.id">重命名</el-button>
					<el-button type="text" style="color: red" size="mini" @click.native="removeExample" v-if="curParam.selExample.id">删除</el-button>
				</el-row>
				
				<el-tabs style="" v-model="tabIndex" id="mainRun">
					<template v-for="(item, index) in param">
						<el-tab-pane :key="item.id"  :label="item.name" :name="index">
							<span slot="label">
								<el-tooltip class="item" effect="dark" placement="bottom" :content="item.remark" v-if="item.remark">
									<span>{{item.name}}</span>
								</el-tooltip>
								<span v-else>{{item.name}}</span>
							</span>
							<runparam :index="index" :item="item" ref="runParam"></runparam>
						</el-tab-pane>
					</template>
				</el-tabs>
            </el-row>
			
            <!-- 
			<div style="position: absolute;top: 102px;right: 10px;z-index: 1000;font-size: 14px" v-if="interfaceObj._id && !curParam.unSave">
                切换:&nbsp;
                <el-autocomplete size="mini" v-model="curParam.selExample.value" :fetch-suggestions="querySearchExample" placeholder="筛选你的运行实例" @select="changeExample">
                    <el-dropdown slot="suffix" v-if="interfaceEditRole">
                            <span class="el-dropdown-link">
                                <i class="el-icon-menu el-input__icon"></i>
                            </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="saveExample" v-if="curParam.selExample.id">保存</el-dropdown-item>
                            <el-dropdown-item @click.native="renameExample" v-if="curParam.selExample.id">重命名</el-dropdown-item>
                            <el-dropdown-item @click.native="saveAsExample">另存为</el-dropdown-item>
                            <el-dropdown-item @click.native="removeExample" v-if="curParam.selExample.id">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-autocomplete>
            </div>
			<el-tabs style="margin-top: 20px" v-model="tabIndex" id="mainRun">
                <template v-for="(item, index) in param">
                    <el-tab-pane :key="item.id"  :label="item.name" :name="index">
                        <span slot="label">
                            <el-tooltip class="item" effect="dark" placement="bottom" :content="item.remark" v-if="item.remark">
                                <span>{{item.name}}</span>
                            </el-tooltip>
                            <span v-else>{{item.name}}</span>
                        </span>
                        <runparam :index="index" :item="item" ref="runParam"></runparam>
                    </el-tab-pane>
                </template>
            </el-tabs> -->
        </el-row>
    </el-row>
</template>

<style>
    #interfaceMainBody{
        margin-top: 5px;
        overflow-y: auto;
        height: calc(100vh - 158px);
        padding: 5px;
        border-top:1px solid #ccc;
        padding-bottom: 80px;
        background-color: white;
        border-radius: 5px;
        font-size: 14px;
    }
</style>

<script>
    var runParam=require("./component/runParam.vue");
    //var store=require("../../../../store")._modulesNamespaceMap["info/interface/run/"].context;
    var store=require("../../../store")._modulesNamespaceMap["info/interface/run/"].context;
    var sessionChange=require("common/mixins/session");
    module.exports={
        props:["interfaceEdit","index"],
        data:function () {
            return {
				queryInterfaceExample:[],
                runPending:false,
                tabType:"query",
                showDialog:false,
            }
        },
        mixins:[sessionChange],
        store:store,
        components:{
            "runparam":runParam
        },
        computed:{
            curParam:function () {
                return this.$store.getters.curParam;
            },
            interfaceEditRole:function () {
                return this.$store.getters.interfaceEditRole
            },
            tabIndex:{
                get:function () {
                    var val=this.$store.state.index;
                    if(val===0)
                    {
                        val="0"
                    }
                    return val;
                },
                set:function (val) {
                    this.$store.commit("setIndex",parseInt(val));
                }
            },
            param:function () {
                return store.state.interface.param;
            },
            interfaceObj:function () {
                return store.state.interface;
            },

            //geqiuli modify
			
            //baseUrl:{
            baseurl:{
                get:function () {
                    console.log("project>info>interface>run>run.vue--baseurl.get")
                    console.log(state.interface.baseurl)
                    // if(store.getters.lastBaseUrl)
                    // {
                    //     return store.getters.lastBaseUrl
                    // }
                    // else
                    // {
                    //     return store.state.baseUrl;
                    // }
                },
                set:function (val) {
                    store.commit("setBaseUrl",val);
                    store.dispatch("setLastBaseUrl",val)
                }
            },
            baseUrls:function () {
                return this.$store.getters.baseUrls;
            },
        },
        methods:{
            run:function () {
                var _this=this;
                this.runPending=true;
                store.dispatch("run").then(function (data) {
                    _this.runPending=false;
                    if(data.code==200)
                    {
                        _this.$refs.runParam[parseInt(_this.tabIndex)].resultType=1;
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            save:function () {
                var _this=this;
                
                store.dispatch("save").then(function (data) {
                    console.log('project>info>interface>run>run.vue>save-data')
                    console.log(data)
                    if(data && data.code!=200)
                    {
                        $.tip(data.msg,0);
                    }
                    _this.$emit("save");
                })
            },
            changeMethod:function () {
                store.commit("changeMethod")
            },
            paste:function () {
                var _this=this;
                setTimeout(function () {
                    var path=_this.interfaceObj.url;
                    var bMark=false;
                    var index=path.indexOf("?");
                    if(index>-1)
                    {
                        bMark=true;
                        _this.interfaceObj.url=_this.interfaceObj.url.substring(0,index);
                    }
                    else
                    {
                        return;
                    }
                    for(var i=0;i<_this.$store.state.interface.param.length;i++)
                    {
                        var arrStoreQuery=_this.$store.state.interface.param[i].query;
                        arrStoreQuery.splice(0,arrStoreQuery.length);
                        if(bMark)
                        {

                            var arr=path.split("?");
                            if(arr[1])
                            {
                                var query=arr[1];
                                var arrQuery=query.split("&");
                                for(var i=0;i<arrQuery.length;i++)
                                {
                                    if(arrQuery[i])
                                    {
                                        var arrQuery1=arrQuery[i].split("=");
                                        arrStoreQuery.push({
                                            name:arrQuery1[0],
                                            value:arrQuery1[1]?{
                                                type:0,
                                                status:"",
                                                data:[{
                                                    value:decodeURIComponent(arrQuery1[1].replace(/\+/g, '%20')),
                                                    remark:""
                                                }]
                                            }:{
                                                type:0,
                                                status:"",
                                                data:[]
                                            },
                                            must:1,
                                            remark:""
                                        })
                                    }
                                }
                            }
                        }
                        else
                        {
                            arrStoreQuery.push({
                                name:"",
                                must:0,
                                remark:""
                            })
                        }
                        _this.$store.state.interface.param[i].query=arrStoreQuery;
                    }
                },100)
            },

            paste_baseurl:function(){
                //
            },  //geqiuli add

            querySearch:function (queryString,cb) {
                var results=this.baseUrls.map(function (obj) {
                    return {
                        value:obj.url,
                        remark:obj.remark
                    }
                })
                if(this.interfaceObj._id)
                {
                    results.push({
                        value:"MockServer",
                        remark:""
                    })
                }
                if(queryString)
                {
                    results=results.filter(function (obj) {
                        return obj.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
                    })
                }
                cb(results);
            },
			
            querySearchExample:function (queryString,cb) {
                net.get("/example/list",{
                    interface:this.interfaceObj._id,
                    paramid:this.param[this.tabIndex].id
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
            showAutoComplete:function (event) {
                this.baseUrl="";
                setTimeout(function(){
                    event.target.parentNode.parentNode.parentNode.querySelector("input").focus();
                },100)
            },
            changeBaseUrl:function (val) {
                if(val=="MockServer")
                {
                    $.tip("如果你修改了Mock数据，请在Mock之前保存接口",1);
                }
                this.$store.commit("changeBaseUrl",val)
            },//geqiuli modify

            changeUrl:function (val) {
                this.$store.commit("changeUrl",val);
            },
            
			initExample:function(){
				var _this=this;
				_this.queryInterfaceExample=[{
                        value:"无运行实例",
                        id:""
                    }]
				net.get("/example/list",{
					interface:this.interfaceObj._id,
					paramid:this.param[this.tabIndex].id
				}).then(function (data) {
					var results=data.data;
					results=results.map(function (obj) {
						return {
							id:obj._id,
							value:obj.name
						}
					})
					for(var obj of results){
						_this.queryInterfaceExample.push(obj)
					}
				})
				console.log("interface>info>interface>run>run.vue>queryInterfaceExample")
				console.log(_this.queryInterfaceExample)
			},
			changeExample:function (id) {
				console.log("interface>info>interface>run>run.vue>changeExample>id")
				console.log(id)
                var _this=this;
                $.startHud();
                this.$store.dispatch("changeExample",id).then(function (data) {
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
            renameExample:function () {
                var _this=this;
                $.input("请输入运行实例名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入运行实例名称",0);
                        return false
                    }
                    $.startHud();
                    _this.$store.dispatch("saveExample",{
                        type:"rename",
                        name:val.value
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            for (let example of _this.queryInterfaceExample) {
                                if (example.id==data.data._id) {
                                    example.value=data.data.name
                                }
                                
                            }
                            $.notify("保存成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                    return true;
                });
            },
            saveExample:function () {
                this.$store.dispatch("saveExample",{
                    type:"save"
                }).then(function (data) {
                    $.stopHud();
                    if(data.code==200)
                    {
                        $.notify("保存成功",1);
                    }
                    else
                    {
                        $.notify(data.msg,0);
                    }
                })
            },
            saveAsExample:function () {
                var _this=this;
                $.input("请输入运行实例名称",function (val) {
                    if(!val.value)
                    {
                        $.tip("请输入运行实例名称",0);
                        return false
                    }
                    $.startHud();
                    _this.$store.dispatch("saveExample",{
                        type:"saveAs",
                        name:val.value
                    }).then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            _this.queryInterfaceExample.push({
                                id:data.data._id,
                                value:data.data.name
                            })
                            $.notify("保存成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                    return true;
                });
            },
            removeExample:function () {
                var _this=this;
                $.confirm("是否删除该运行实例?",function () {
                    $.startHud();
                    _this.$store.dispatch("removeExample").then(function (data) {
                        $.stopHud();
                        if(data.code==200)
                        {
                            _this.initExample();
                            $.notify("删除成功",1);
                        }
                        else
                        {
                            $.notify(data.msg,0);
                        }
                    })
                })
            },
            joinTest:function () {
                var _this=this;
                $.startHud();
                this.$store.dispatch("joinTest").then(function (obj) {
                    $.stopHud();
                    var o={
                        type:"interface",
                        id:0,
                        name:_this.curParam.selExample.id?(obj.name+"("+_this.curParam.selExample.value+")"):obj.name,
                        data:JSON.stringify(obj),
                        argv:{
                            param:{},
                            query:{},
                            header:{},
                            body:{}
                        },
                        status:0,
                        modify:0
                    };
                    $.startHud();
                    net.get("/test/allgrouplist").then(function (data) {
                        $.stopHud();
                        if(data.code!=200)
                        {
                            $.notify(data.msg,0);
                        }
                        $.showBox(_this,require("../test/test.vue"),{
                            testType:1,
                            propTestGroupList:data.data,
                            propJoin:o
                        });
                    })
                })
            }
        },
        created:function () {
            store.dispatch("initData",$.clone(this.interfaceEdit));
            store.commit("setIndex",this.index);
            if(session.get("exampleId"))
            {
                this.curParam.selExample.value=session.get("exampleId");
                store.dispatch("changeExample",session.get("exampleId"));
                session.remove("exampleId");
            }
			this.initExample();
        },
    }
</script>