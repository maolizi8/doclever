
var store=new Vuex.Store({
    
    state:{
        teamid:"",
        teamList:[],
		teamSort:1,
        projectList:[],
		projectSort:1,
		
        teamCreateSort:1,
        teamJoinSort:0,
        init:false,
        event:new Vue(),
    },
    mutations:{
        addTeam:function (state,data) {
			var list=state.teamList;
			//list.push(data);
             
			var sort=state.teamSort
			if(sort==0)
            {
                list.unshift(data);
            }
            else
            {
                for(var i=0;;i++)
                {
                    if(i==list.length || list[i].name.toLowerCase()>=data.name.toLowerCase())
                    {
                        list.splice(i,0,data);
                        break;
                    }
                }
            } 
        },
        changeTeamSort:function (state,type) {
            var sortType,list;
            if(type=="create")
            {
                sortType=state.teamCreateSort;
                list=state.teamCreateList;
            }
            else if(type=="join")
            {
                sortType=state.teamJoinSort;
                list=state.teamJoinList;
            }
            if(sortType==0)
            {
                list.sort(function (obj1,obj2) {
                    if(obj1.createdAt>obj2.createdAt)
                    {
                        return -1;
                    }
                    else if(obj1.createdAt<obj2.createdAt)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                })
            }
            else
            {
                list.sort(function (obj1,obj2) {
                    if(obj1.name.toLowerCase()<obj2.name.toLowerCase())
                    {
                        return -1;
                    }
                    else if(obj1.name.toLowerCase()>obj2.name.toLowerCase())
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                })
            }
        },

        addProject:function (state,data) {

            
            var sort=state.projectSort;
            var list=state.projectList;
                projInfo={
                    interfaceCount: data.data.interfaceCount,
                    name: data.data.name,
                    own: 1,
                    owner: data.data.owner,
                    role: 0,
                    userCount: data.data.userCount,
                    _id: data.data._id
                }
                if(data.data.team==state.teamid){
					//list.unshift(projInfo);
					if(sort==0)
					{
						list.unshift(projInfo);
					}
					else
					{
						for(var i=0;;i++)
						{
							if(i==list.length || list[i].name.toLowerCase()>=projInfo.name.toLowerCase())
							{
								list.splice(i,0,projInfo);
								break;
							}
						}
					} 
				}else if(!data.data.team && !state.teamid){
					//list.unshift(projInfo);
					if(sort==0)
					{
						list.unshift(projInfo);
					}
					else
					{
						for(var i=0;;i++)
						{
							if(i==list.length || list[i].name.toLowerCase()>=projInfo.name.toLowerCase())
							{
								list.splice(i,0,projInfo);
								break;
							}
						}
					} 
				}
        },

    },
    actions:{
        init:function (context) {
            context.state.teamid=getUrlParam("teamid")?getUrlParam("teamid"):"";

            console.log('interfaceproj>strore.js>teamid');
            console.log(context.state.teamid);

            context.state.teamList=[];
            context.state.projectList=[];
            
            var req_list=[
                net.get("/team/teamlist",{}),
                net.get("/team/info2",{
                    id:context.state.teamid
                })
            ]
            
            return Promise.all(req_list).then(function (values) {

                var obj1=values[0];
                var obj2=values[1];
                if(obj1.code==200)
                {
                    context.state.teamList=obj1.data
                }
                else
                {
                    throw obj1.msg;
                }
                if(obj2.code==200)
                {
                    context.state.projectList=obj2.data
                }
                else
                {
                    throw obj2.msg;
                }
                //context.state.init=true;
                context.state.event.$emit("init");
                return values;
            })
        },

        addTeam:function (context,data) {
            var query={
                name:data.name,
                dis:data.dis
            };
            return net.post("/team/save",query).then(function (data) {
                if(data.code==200)
                {
                    context.commit("addTeam",data.data);
                }
                return data;
            })
        },
        addProject:function (context,data) {
            var query={
                name:data.name,
                dis:data.dis,
                team:data.team
            };
            
            var type="interface";
           
            var pro;
                
                pro=net.post("/project/create",query)
           
            return pro.then(function (data) {
                
                if(data.code==200)
                {
                    context.commit("addProject",{
                        data:data.data,
                        type:type
                    });
                }
                return data;
            })
        },
    },
   
    modules:{
        
    },
})

module.exports=store;