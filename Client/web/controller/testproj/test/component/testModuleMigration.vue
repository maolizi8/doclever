<template>
    <el-dialog title="测试模块 - 迁移项目"  width="50%" ref="box" :visible.sync="showDialog" append-to-body>
       
        <el-form ref="form" label-width="130px">
            <el-form-item label="选择项目:">
                <el-cascader size="mini" style="width: 90%" expand-trigger="hover" :options="optionArr" v-model="selProjectGroup" @change="changeCollection" placeholder="请选择项目">
                </el-cascader>

            </el-form-item>
        </el-form>
       <el-row class="dialog-footer" slot="footer">
            <el-button size="mini" type="primary" @click="save" :loading="savePending">
                保存
            </el-button>
        </el-row>
    </el-dialog>
</template>

<style scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
    .el-form-item__label{
        padding:4px 14px;
    }
    .el-cascader--mini{
        width: 90%;
    }
    th{
        padding: 2px 0;
    }
    tr.el-table__row>td{
        padding: 2px 0;
    }
    .el-table td, .el-table th{
        padding: 2px 0;
    }
    .el-table_1_column_1,.el-table_1_column_2{
        padding: 2px 0;
    }
    .box-shadow{
        border-radius: 5px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.24);
        background-color: white;height: 66%;
    }
</style>

<script>
    
    module.exports={
        props:["projectGroups","projectId","moduleId"],
        data:function () {
            return {
                selProjectGroup:[this.projectId,this.groupId],
                props:{
                    value:"_id",
                    label:"name"
                   // ,children:"data"
                },
                
                savePending:false,
                removePending:false,
                showDialog:false
            }
        },
        directives:{
            
        },
        computed:{
            optionArr:function(){
                var _this=this;
                var arr=this.projectGroups.map(function (obj) {
                    var projObj={
                                    label:obj.name,
                                    value:obj._id
                                }
                    return projObj 
                   
                });
               console.log("testModuleMigration.vue>optionArr")
               console.log(arr)
                return arr
            }
        },
        methods:{
           
            changeCollection:function (val) {
                console.log(val)
                
            },
            save:function () {
               var collectionSel=this.selProjectGroup;
                if(!collectionSel[0])
                {
                    $.tip("请选择项目",0);
                    return;
                }
                console.log("testModuleMigration.vue>collectionSel")
                console.log(collectionSel)
                if (collectionSel[0]==this.projectId) {
                    $.tip("选择的迁移项目不应是当前项目！",0);
                    return;
                }
                this.savePending=true;
                var _this=this;
                var query={
                    project:collectionSel[0],
                    module:_this.moduleId
                };

                net.post("/test/migratemodule",query).then(function (data) {
                    _this.savePending=false;
                    if(data.code==200)
                    {
                        $.notify("迁移成功",1);
                        _this.showDialog=false;
                        _this.$emit("save",{
                            module:_this.moduleId,
                            project:collectionSel[0].toString()
                        });
                    }
                    else
                    {
                        $.notify(data.msg,0)
                    }
                })
            },
            
        },
        created:function () {
            
        }
    }
</script>