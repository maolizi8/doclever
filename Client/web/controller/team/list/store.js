module.exports={
    namespaced:true,
    state:{
        teamList:[],
        teamProjectList:[],

        teamCreateList:[],
        teamJoinList:[],
        teamCreateSort:0,
        teamJoinSort:0,
        bRefreshProjectList:1
    },
    getters:{
        event:function (state,getters,rootState) {
            return rootState.event;
        },
        teamListLength:function (state) {
            //return state.teamCreateList.length+state.teamJoinList.length;
            return state.teamProjectList.length;
        },
        projectCreateSort:function (state) {
            return state.teamCreateSort;
        },
        projectJoinSort:function (state) {
            return state.teamJoinSort;
        },
        rootInit:function (state,getters,rootState) {
            return rootState.init;
        },
        teamManageRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["team/info/manageRole"];
        }
    },
    mutations:{
        addTeam:function (state,data) {
            var sort=state.teamCreateSort,list=state.teamCreateList;
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

            // console.log('team>list>store.js>addProject>data')
            // console.log(data) 
            var sort;
            var list;

                //sort=state.projectCreateSort;
                list=state.teamProjectList;
                projInfo={
                    interfaceCount: data.data.interfaceCount,
                    name: data.data.name,
                    own: 1,
                    owner: data.data.owner,
                    role: 0,
                    userCount: data.data.userCount,
                    _id: data.data._id
                }
                
                for (let team of list) {
                    console.log('team>list>store.js>addProject>lit[i]')
                    console.log(team._id) 
                    console.log(data.data.team) 
                    if (!data.data.team && team.name=="无团队") {
                        team.data.unshift(projInfo);
                        break;
                    } else if (team._id==data.data.team) {
                        team.data.unshift(projInfo);
                        break;
                    }
                    
                    
                }
                // console.log('team>list>store.js>teamProjectList')
                // console.log(state.teamProjectList) 
                // console.log(list) 
            // if(data.type=="interface")
            // {
            //     if(session.get("teamId"))
            //     {
            //         sort=state.projectTeamSort;
            //         list=state.projectTeamList;
            //     }
            //     else
            //     {
            //         sort=state.projectCreateSort;
            //         list=state.projectCreateList;
            //     }
            // }
            
            // if(sort==0)
            // {
            //     list.unshift(data.data);
            // }
            // else
            // {
            //     for(var i=0;;i++)
            //     {
            //         if(i==list.length || list[i].name.toLowerCase()>=data.data.name.toLowerCase())
            //         {
            //             list.splice(i,0,data.data);
            //             break;
            //         }
            //     }
            // }

        },

    },
    actions:{
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
            //var type=data.type;
            var type="interface";
            // if(session.get("teamId"))
            // {
            //     query.team=session.get("teamId");
            // }
            var pro;
                
                pro=net.post("/project/create",query)
            // if(data.type=="interface")
            // {
            //     pro=net.post("/project/create",query)
            // }
            // else if(data.type=="doc")
            // {
            //     pro=net.post("/doc/project",query)
            // }
            // else if(data.type=="test")
            // {
            //     pro=net.post("/test/project",query)
            // }
            return pro.then(function (data) {
                // console.log('team>list>store.js>addProject>data')
                // console.log(data)
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

        init:function (context) {
            console.log('team>list>strore.js')

            context.state.teamList=[];
            context.state.teamProjectList=[];

            context.state.teamCreateList=[];
            context.state.teamJoinList=[];
            context.state.teamCreateSort=0;
            context.state.teamJoinSort=0;
            var arr=[
                //net.get("/team/list",{}),

                net.get("/team/alllist",{}),
                net.get("/team/teamlist",{}),
                
            ];
            if(context.getters.rootInit && context.rootState.project.type=="list" && context.state.bRefreshProjectList)
            {
                arr.push(context.dispatch("project/list/init",null,{
                    root:true
                }))
            }
            context.state.bRefreshProjectList=1;

            return Promise.all(arr).then(function (arr) {
                
                var data1=arr[0];
                var data2=arr[1];
                
                if(data1.code==200)
                {
                    // console.log('team>list>store.js>init>data1.data-teamProjectList')
                    // console.log(data1.data)

                    for(var i=0;i<data1.data.length;i++)
                    {
                        context.state.teamProjectList.push(data1.data[i]);
                    }
                    //console.log(context.state.teamProjectList)
                }
                else
                {
                    throw data1.msg;
                }

                if(data2.code==200)
                {
                    
                    for(var i=0;i<data2.data.length;i++)
                    {
                        context.state.teamList.push(data2.data[i]);
                    }
                }
                else
                {
                    throw data2.msg;
                }
                
                context.getters.event.$emit("initTeamList");
                return arr;
            })
        },
        info:function (context,obj) {
            context.dispatch("team/changeToInfo",obj,{
                root:true
            });
        }
    },
    modules:{

    }
}