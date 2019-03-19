<template>
    <el-row class="row" style="text-align: center;height: 30px;line-height: 30px">
		<span>共{{totalPage+1}}页，每页{{everypage}}条</span>&nbsp;&nbsp;&nbsp;
		<el-button type="text" size="small" icon="el-icon-d-arrow-left" @click="firtPage"></el-button>
		&nbsp;&nbsp;&nbsp;
        <el-button type="text" size="small" icon="el-icon-arrow-left" @click="pre"></el-button>
		&nbsp;&nbsp;&nbsp;{{page+1}}&nbsp;&nbsp;&nbsp;
		<el-button type="text" size="small" icon="el-icon-arrow-right" @click="next" style="margin-left: 0"></el-button>
		&nbsp;&nbsp;&nbsp;
		<el-button type="text" size="small" icon="el-icon-d-arrow-right" @click="lastPage" style="margin-left: 0" v-if="totalPage">
		</el-button>
    </el-row>
</template>

<script>
    module.exports={
		props:["pages","numofpage"],
        data:function () {
            return {
                page:0, //from 0, actual page+1
				
				//totalPage:this.pages?(this.pages-1):0, //actual totalPage+1
				everypage:this.numofpage?this.numofpage:20
            }
        },
		computed:{
			
            totalPage:function () {
				console.log("pageCompo.vue>computed:>total pages:")
				console.log(this.pages)
				if(this.pages){
					return this.pages-1
				}else{
					return 0
				}
            }
            /**/
        },
        methods:{
			init:function () {
                this.page=0;
                this.$emit("change",this.page);
            },
			
            pre:function () {
                if(this.page>0)
                {
                    this.page--;
                    this.$emit("change",this.page);
                }
				else{
					$.notify("前面没有了~",1);
				}
            },
            next:function () {
				
				if(this.page>=this.totalPage){
					$.notify("没有更多了~",1);
				}else{
					this.page++;
					this.$emit("change",this.page);
				}
            },
            firtPage:function () {
                if(this.page>0)
                {
					this.page=0
                    this.$emit("change",0);
                }
				else{
					$.notify("已经是首页了~",1);
				}
            },
			lastPage:function () {
				if(this.totalPage)
                {
					
					this.page=this.totalPage
                    this.$emit("change",this.totalPage);
                }
                else{
					$.notify("已经到底了~",1);
				}
            },
        }
    }
</script>