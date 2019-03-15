/**
 * Created by sunxin on 2017/7/5.
 */


var e=require("../../util/error.json");
var util=require("../../util/util");
var user=require("../../model/userModel")
var project=require("../../model/projectModel")
var version=require("../../model/versionModel")
var group=require("../../model/groupModel")
var interface=require("../../model/interfaceModel")
var poll=require("../../model/pollModel")

var testCollection=require("../../model/testCollectionModel")
var pollSet=require("../../model/pollSetModel") //gql add
var pollRun=require("../../model/pollRunModel") //gql add
var pollRunTest=require("../../model/pollRunTestModel") //gql add

var moment=require("moment");//gql add


var fs=require("fs");
var uuid=require("uuid/v1");
function  Poll() {
    this.save=async (req,res)=> {
        try
        {
            let objCollection=await (testCollection.findOneAsync({
                _id:req.clientParam.collection
            }));
            if(!objCollection)
            {
                util.throw(e.testCollectionNotFound,"集合不存在");
            }
            else if(objCollection.poll && req.clientParam.id  && objCollection.poll!=req.clientParam.id)
            {
                util.throw(e.systemReason,"集合已和定时任务绑定");
            }
            let obj;
            console.log('poll.save>users')
            console.log(req.clientParam.users)
            let update={
                name:req.clientParam.name,//gql add
                users:JSON.parse(req.clientParam.users),
                date:JSON.parse(req.clientParam.date),
                time:JSON.parse(req.clientParam.time),
                time2:JSON.parse(req.clientParam.time2),
                // sendInfo:{
                //     user:req.clientParam.user,
                //     password:req.clientParam.password,
                //     smtp:req.clientParam.smtp,
                //     port:req.clientParam.port
                // },
                // baseUrl:req.clientParam.url,
                //baseUrl:'',
                testProject:req.clientParam.testproject,
                testCollection:req.clientParam.collection,//gql add

                //phoneInfo:JSON.parse(req.clientParam.phoneinfo),
                enabled:req.clientParam.enabled,
                sendMail:req.clientParam.sendMail,
                failSend:req.clientParam.failsend,
                owner:req.clientParam.owner,
            }
            if(req.clientParam.interproject)
            {
                update.interProject=req.clientParam.interproject;
            }
            if(req.clientParam.id)
            {
                obj=await (poll.findOneAndUpdateAsync({
                    _id:req.clientParam.id
                },update,{
                    new:true
                }));
                if (req.clientParam.collection!=req.clientParam.originCollection) {
                    
                    await (testCollection.updateAsync({
                        _id:req.clientParam.originCollection
                    },{
                        $unset:{
                            poll:1
                        }
                    }))
                }
            }
            else
            {
                obj=await (poll.createAsync(update));
            }
            // obj.populate([{
            //     path:"testProject",
            //     select:"name"
            // },{
            //     path:"users",
            //     select:"name"
            // },{
            //     path:"owner",
            //     select:"name"
            // },{
            //     path:"testCollection",
            //     select:"name"
            // }])
            obj=await (poll.populateAsync(obj,{
                path:"testProject",
               select:"name"
            }));
            obj=await (poll.populateAsync(obj,{
                path:"testCollection",
                select:"name"
            }));
            obj=await (poll.populateAsync(obj,{
                path:"owner",
                select:"name"
            }));

            objCollection.poll=obj._id;
            await (objCollection.saveAsync());
            if(req.clientParam.immediate)
            {
                util.runPollBackend([obj],req.clientParam.operator);
                //await (util.runPollBackend([obj],req.clientParam.operator));
            }
            util.ok(res,obj,"ok");
        }
        catch (err)
        {
            util.catch(res,err);
        }
    }

    this.remove=async (req,res)=> {
        try
        {
            let query={
                _id:req.clientParam.id
            }
            await (poll.removeAsync(query))
            await (testCollection.updateAsync({
                poll:req.clientParam.id
            },{
                $unset:{
                    poll:1
                }
            }))
            util.ok(res,"ok");
        }
        catch (err)
        {
            util.catch(res,err);
        }
    }

    this.info=async (req,res)=> {
        try
        {
            let query={
                _id:req.clientParam.id
            }
            let obj=await (poll.findOneAsync(query,null,{
                populate:{
                    path:"users",
                    select:"name photo"
                }
            }))
            if(!obj)
            {
                util.throw(e.pollNotFound,"定时任务不存在");
            }
            util.ok(res,obj,"ok");
        }
        catch (err)
        {
            util.catch(res,err);
        }
    }

    this.list=async (req,res)=> {
        try
        {
            
            let query={
                //_id:req.clientParam.id
            }
            //console.log(req.clientParam.id);
            let arr;
            //let userId=req.userInfo._id;
            arr=await (poll.findAsync(query,null,{
                sort:"name",
                populate:[{
                    path:"testProject",
                    select:"name"
                },{
                    path:"users",
                    select:"name"
                },{
                    path:"owner",
                    select:"name"
                },{
                    path:"testCollection",
                    select:"name"
                }]
            }))
            for (let obj of arr) {
                let tests=await (testCollection.findOneAsync({
                    _id:obj.testCollection._id
                },'tests'))
                obj._doc.testCount=tests.tests.length;
            }
            util.ok(res,arr,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    } //gql add

    this.sendInfo=async (req,res)=> {
        try
        {
            
            let query={
               // isDefault:1
            }
            
            let obj;
            
            obj=await (pollSet.findOneAsync(query))
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add
    this.savePollSet=async (req,res)=> {
        try
        {
            
            let update={
                sendInfo:{
                    user:req.clientParam.user,
                    password:req.clientParam.password,
                    smtp:req.clientParam.smtp,
                    port:req.clientParam.port
                },
                isDefault:req.clientParam.isdefault
               
            }
            
            if(req.clientParam.id)
            {
                obj=await (pollSet.findOneAndUpdateAsync({
                    _id:req.clientParam.id
                },update,{
                    new:true
                }));
            }
            else
            {
                obj=await (pollSet.createAsync(update));
            }

            if (req.clientParam.immediate) {
                console.log('<req.clientParam.immediate,reciever>')
                console.log(req.clientParam.reciever)
            }
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add

    this.saveRun=async (req,res)=> {
        try
        {
            
            let query={
                poll:req.clientParam.poll,
                status:req.clientParam.status,
                testProject:req.clientParam.testprojid,
                testCollection:req.clientParam.collectionid
            }
            
            let obj=await (pollRun.createAsync(query));
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add
    this.run=async (req,res)=> {
        try
        {
            //parseInt(d2 - d1) / 1000 / 60
            let inProgressObj=await (pollRun.findAsync({
                poll:req.clientParam.poll,
                status:99
            },"createdAt",{
                sort:"-createdAt"
            }));
            if (inProgressObj.length>0) {
                console.log(inProgressObj)
                let timeDiffer=parseInt(moment()-inProgressObj[0].createdAt) / 1000 / 60;
                
                if (timeDiffer<10) {
                    util.throw(e.systemReason,"该定时任务还在运行中，请稍候再试");
                } else {
                    let query={
                        _id:req.clientParam.poll
                    }
                    let obj=await (poll.findAsync(query));

                    //await (util.runPollBackend(obj,req.clientParam.operator));
                    
                    util.runPollBackend(obj,req.clientParam.operator);
                    
                    util.ok(res,obj,"ok");
                }
            }else{
                let query={
                    _id:req.clientParam.poll
                }
                let obj=await (poll.findAsync(query));
    
                util.runPollBackend(obj,req.clientParam.operator);
                //await (util.runPollBackend(obj,req.clientParam.operator));
    
                util.ok(res,obj,"ok");
            }

           
        }
        catch (err)
        {   
            console.log(err);
            util.catch(res,err);
        }
    }//gql add

    this.runList=async (req,res)=> {
        try
        {
            let query={
                poll:req.clientParam.poll
            }
            
            //"pollName projectName collectionName status operator testFail testSuccess testTotal testUnkown createdAt"
            let obj=await (pollRun.findAsync(query,
               null,
                {
                    sort:"-createdAt",
                    limit:10
                }));
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add

    this.runInfo=async (req,res)=> {
        try
        {
            let query={
                _id:req.clientParam.id
            }
            
            let obj=await (pollRun.findOneAsync(query,null,{
                // populate:[{
                //     path:"poll",
                //     select:"name"
                // },{
                //     path:"testProject",
                //     select:"name"
                // },{
                //     path:"testCollection",
                //     select:"name"
                // }]
            }));
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add

    this.runInfo2=async (req,res)=> {
        try
        {
            let query={
                _id:req.clientParam.id
            }
            
            let obj=await (pollRun.findOneAsync(query,null,{
                // populate:[{
                //     path:"poll",
                //     select:"name"
                // },{
                //     path:"testProject",
                //     select:"name"
                // },{
                //     path:"testCollection",
                //     select:"name"
                // }]
            }));
            // obj._doc.tests=await (pollRunTest.findAsync({
            //     pollRun:req.clientParam.id
            // },null,{
            //     sort:"-status"
            // }));
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add

    this.runInfoTests=async (req,res)=> {
        try
        {
            let query={
                _id:req.clientParam.id
            }
            
            let tests=await (pollRunTest.findAsync({
                pollRun:req.clientParam.id
            },null,{
                sort:"-status",
                limit:100
            }));
            
            //console.log(tests)
            util.ok(res,tests,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add

    this.pollRunInfo=async (req,res)=> {
        try
        {
            let query={
                failReason:{
                    reason:req.clientParam.reason,
                    other:req.clientParam.other,
                    recorder:req.clientParam.recorder
                }
            }
            let obj=await (pollRun.findOneAndUpdateAsync({
                _id:req.clientParam.id
            },query,{
                new:true
            }))
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add 
   
    
}

module.exports=Poll;
