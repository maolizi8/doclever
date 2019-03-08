module.exports={
    namespaced:true,
    state:{
        testProjectList:[],//gql add
		testProjectSort:1,
		
        testCreateList:[],
        testJoinList:[],
        testTeamList:[],
        testCreateSort:0,
        testJoinSort:0,
        testTeamSort:0
    },
    getters:{
        
        
        testCreateSort:function (state) {
            return state.testCreateSort;
        },
        testJoinSort:function (state) {
            return state.testJoinSort;
        },
        rootInit:function (state,getters,rootState) {
            return rootState.init;
        },
        teamManageRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["team/info/manageRole"];
        }
    },
    mutations:{
        addProject:function (state,data) {
            var sort=state.testProjectSort;
			var list=state.testProjectList;

            if(sort==0)
            {
                list.unshift(data.data);
            }
            else
            {
                for(var i=0;;i++)
                {
                    if(i==list.length || list[i].name.toLowerCase()>=data.data.name.toLowerCase())
                    {
                        list.splice(i,0,data.data);
                        break;
                    }
                }
            }
        },
        changeSort:function (state,data) {
            var sortType,list;
            
            if(data.type=="create")
            {
                sortType=state.testCreateSort;
                list=state.testCreateList;
            }
            else if(data.type=="join")
            {
                sortType=state.testJoinSort;
                list=state.testJoinList;
            }
            else if(data.type=="team")
            {
                sortType=state.testTeamSort;
                list=state.testTeamList;
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
    },
    actions:{
        addProject:function (context,data) {
            var query={
                name:data.name,
                dis:data.dis
            };
            var type=data.type;
			console.log("addProject--data");
			console.log(data);
            if(session.get("teamId"))
            {
                query.team=session.get("teamId");
            }
            var pro;
            
                pro=net.post("/test/project",query)
            
            return pro.then(function (data) {
				console.log("addProject--data--then");
				console.log(data);
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
        init:function (context,data) {
            console.log('testproj>list>strore.js>init>data')
			console.log(data)
			
            context.state.testProjectList=[];
			context.state.testProjectSort=1;
			
            if(data)
            {
                context.state.testTeamList=data.test;
                return {
                    code:200
                }
            }
            else
            {
                return net.get("/test/projectlist2",{}).then(function (values) {
					console.log('testproj>list>strore.js>init>testProjectList')
					console.log(values)
                    var data=values;
                    
                    if(data.code==200)
                    {
						context.state.testProjectList=data.data;
                    }
                    else
                    {
                        throw data.msg;
                    }
                    return data;
                })
            }
        },
        info:function (context,obj) {
            context.dispatch("testproj/changeToInfo",obj,{
                root:true
            });
        }
    },
    modules:{

    }
}