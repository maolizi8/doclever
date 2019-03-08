<template>
    <el-col class="col" :span="6" style="width:250px;height: 60px;text-align: right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
        
        <el-dropdown @command="handleCommand" style="">
            <span class="el-dropdown-link" style="color: #50bfff;cursor: pointer;font-size:22px;">
                <span>
                    <img :src="userPhoto" style="width: 40px;height: 40px; border-radius:50%;margin-top: 5px">
					&nbsp;{{(session_name.length>13)?(session_name.substring(0,12)+".."):session_name}}
                    <!-- <i class="fa fa-user" style="font-size:28px;"></i> {{session_name}} -->
                </span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    Proxy:<br>
                    <el-switch v-model="proxy" active-color="#13ce66" inactive-color="#ff4949" @click.native.stop="">
                    </el-switch>
                </el-dropdown-item>
                <!-- <el-dropdown-item command="update">检查更新</el-dropdown-item> -->
                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                <el-dropdown-item command="doc">使用教程(新)</el-dropdown-item>
                <el-dropdown-item command="help">官网教程(旧)</el-dropdown-item>
                <el-dropdown-item command="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-col>
</template>

<style>

</style>

<script>
/**<img v-proxy="session_photo" style="width: 40px;height: 40px; border-radius:50%;margin-top: 10px"> */
    var proxyImg=require("common/director/proxyImg");
    var sessionChange=require("common/mixins/session");
    
    var ver=require("../../../ver.json");

    module.exports = {
        
        data: function () {
            // session_name:session.get("name");
            // session_photo:session.get("photo");
            // proxy:session.get("proxy")?true:false
            return {
                userPhoto:require("pic/admin.jpeg"),

                session_name:session.get("name"),
                session_photo:session.get("photo"),
                proxy:session.get("proxy")?true:false
            }
        },
        mixins:[sessionChange],
        directives:{
            proxy:proxyImg
        },
        watch:{
            proxy:function (val) {
                if(val)
                {
                    session.set("proxy",1);
                    $.tip("Proxy代理已开启",1)
                }
                else
                {
                    session.remove("proxy");
                    $.tip("Proxy代理已关闭",1)
                }
            }
        },
        methods: {
            handleCommand:function (command) {
                if(command=="update")
                {
                    var xml=new XMLHttpRequest();
                    $.startHud();
                    xml.onreadystatechange=function () {
                        if(xml.readyState==4 && xml.status==200)
                        {
                            $.stopHud();
                            var obj=JSON.parse(xml.responseText);
                            var verArr=obj[0].name.split(".");
                            var verLocalArr=ver.version.split(".");
                            var bNew=false;
                            for(var i=0;i<3;i++)
                            {
                                if(verArr[i]>verLocalArr[i])
                                {
                                    bNew=true;
                                    break;
                                }
                                else if(verArr[i]<verLocalArr[i])
                                {
                                    break;
                                }
                            }
                            if(bNew)
                            {
                                $.confirm("已发现新版本"+verArr.join(".")+" 是否现在下载？",function () {
                                    window.open(obj[0].zipball_url,"_blank");
                                })
                            }
                            else
                            {
                                $.tip("已经是最新版本了",1);
                            }
                        }
                    }
                    xml.open("GET","https://api.github.com/repos/sx1989827/DOClever/tags?timestamp="+(new Date()).getTime(),true);
                    xml.send();
                }
                else if(command=="quit")
                {
                    var _this=this;
                    if(this.adminPage)
                    {
                        net.post("/admin/logout",{}).then(function (data) {
                            if(data.code==200)
                            {
                                _this.$notify({
                                    title: '退出成功',
                                    type: 'success'
                                });
                                sessionStorage.removeItem("admin");
                                setTimeout(function () {
                                    location.href="/";
                                },1000)

                            }
                        })
                    }
                    else
                    {
                        net.post("/user/logout",{}).then(function (data) {
                            if(data.code==200)
                            {
                                _this.$notify({
                                    title: '退出成功',
                                    type: 'success'
                                });
                                session.clear();
                                setTimeout(function () {
                                    location.href="/";
                                },1000)

                            }
                        })
                    }
                }
                else if(command=="help")
                {
                    //window.open("../help/help.html","_blank");
                    window.open("http://doclever.cn/controller/read/read.html#5a532f98b7731a2ba86093b3","_blank");
                }
                else if(command=="person")
                {
                    window.open("person.html","_blank");
                }
                else if(command=="doc")
                {
                    //window.open("../help/help.html","_blank");
                    window.open("https://docs.qq.com/doc/DUWZReXpCcW9nUkdP","_blank");
                }
            }
        },
        created:function () {
           
        }
    }
</script>