module.exports= {
    namespaced: true,
	//state:{
    //    interid:getUrlParam("interid"),//geqiuli add
    //},
    getters: {
		interid:function (state,getters,rootState) {
            return rootState.info.interid;
        },
		
        objCopyJSON:function (state,getters,rootState) {
            return rootState.objCopyJSON;
        },
        baseUrls: function (state, getters, rootState) {
			//return rootState.project.info.project.baseUrls;
            return rootState.info.project.baseUrls;
        },
        before: function (state, getters, rootState) {
			//return rootState.project.info.project.before;
            return rootState.info.project.before;
        },
        after: function (state, getters, rootState) {
			//return rootState.project.info.project.after;
            return rootState.info.project.after;
        },
        event: function (state, getters, rootState) {
            return rootState.event;
        },
        status:function (state, getters, rootState) {
            // console.log('interface>info>global>store.js>status>rootState')
			// console.log(rootState)
            // console.log(rootState.info)
            return rootState.info.status;
			//return rootState.status;
        },
        template:function (state, getters, rootState) {
            //return rootState.project.info.template;
			return rootState.info.template;
        },
		
        interfaceEditRole:function (state,getters,rootState,rootGetters) {
			//return rootGetters["project/info/interfaceEditRole"];
            return rootGetters["info/interfaceEditRole"];
        },
        testEditRole:function (state,getters,rootState,rootGetters) {
            
			return rootGetters["info/testEditRole"];
        },
        globalBaseUrlRole:function (state,getters,rootState,rootGetters) {
            
			return rootGetters["info/globalBaseUrlRole"];
        },
        globalStatusRole:function (state,getters,rootState,rootGetters) {
            
			return rootGetters["info/globalStatusRole"];
        },
        globalInjectRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/globalInjectRole"];
        },
        globalTemplateRole:function (state,getters,rootState,rootGetters) {
            
			return rootGetters["info/globalTemplateRole"];
        },
        globalDocRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/globalDocRole"];
        },
        versionEditRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/versionEditRole"];
        },
        versionRollRole:function (state,getters,rootState,rootGetters) {
            return rootGetters["info/versionRollRole"];
        }
    },
    actions: {
        setBaseUrls: function (context, data) {
            //context.commit("project/info/setBaseUrls", data, {
			context.commit("info/setBaseUrls", data, {
                root: true
            });
        },
        setInject: function (context, data) {
			//project/info
            context.commit("info/setBefore", data.before, {
                root: true
            })
			//project/info
            context.commit("info/setAfter", data.after, {
                root: true
            })
        }
    }
}