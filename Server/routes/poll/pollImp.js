/**
 * Created by sunxin on 2017/7/5.
 */
var pollClass=require("./poll");
var poll=new pollClass();
var interface=[
    {
        "method":"POST",
        "path":"/poll/save",
        "param": {
            id:{
                type:String,
                optional:1
            },
            name:{
                type:String,
            },
            testproject:{
                type:String,
            },
            collection:String,
            originCollection:{
                type:String,
                optional:1
            },
            interproject:{
                type:String,
                optional:1
            },

            users:{
                type:String,
                optional:1
            },
            date:{
                type:String,
            },
            time:{
                type:String,
            },
            time2:{
                type:String,
            },
            // user:{
            //     type:String,
            //     optional:1
            // },
            // password:{
            //     type:String,
            //     optional:1
            // },
            // smtp:{
            //     type:String,
            //     optional:1
            // },
            // port:{
            //     type:Number,
            //     optional:1
            // },
            // url:{
            //     type:String,
            //     optional:1
            // },
            enabled:Number,
            immediate:Number,
            //phoneinfo:String,
            operator:String,
            sendMail:Number,
            failsend:Number,
            owner:String
        },
        "data":String,
        user:1,
        handle:poll.save
    },
    {
        "method":"DELETE",
        "path":"/poll/item",
        "param": {
            id:{
                type:String,
            }
        },
        "data":String,
        user:1,
        handle:poll.remove
    },
    {
        "method":"GET",
        "path":"/poll/item",
        "param": {
            id:{
                type:String,
            }
        },
        "data":String,
        user:1,
        handle:poll.info
    },
    {
        "method":"GET",
        "path":"/poll/list",
        "param": {
            simple:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:poll.list
    },//gql add
    
    {
        "method":"GET",
        "path":"/poll/sendinfo",
        "param": {

        },
        "data":String,
        user:1,
        handle:poll.sendInfo
    },//gql add
    {
        "method":"POST",
        "path":"/poll/savepollset",
        "param": {
            id:{
                type:String,
                optional:1
            },
            user:{
                type:String,
            },
            password:{
                type:String,
            },
            smtp:{
                type:String,
            },
            port:{
                type:Number,
            },
            isdefault:{
                type:Number,
            },
            immediate:Number,
            reciever:{
                type:String,
                optional:1
            },
        },
        "data":String,
        user:1,
        handle:poll.savePollSet
    },//gql add
    {
        "method":"POST",
        "path":"/poll/saverun",
        "param": {
            poll:{
                type:String,
            },
            status:Number,  //0-success, 1-fail, 99-未知
            testProject:{
                type:String,
            },
            testCollection:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:poll.saveRun
    },//gql add
    {
        "method":"POST",
        "path":"/poll/runlist",
        "param": {
            poll:{
                type:String,
            },
            page:Number,
            startdate:{
                type:String,
                optional:1
            },
            enddate:{
                type:String,
                optional:1
            },
            sortByFail:{
                type:Number,
                optional:1
            },
        },
        "data":String,
        user:1,
        handle:poll.runList
    },//gql add
    {
        "method":"GET",
        "path":"/poll/runlistcount",
        "param": {
            poll:{
                type:String,
            },
            startdate:{
                type:String,
                optional:1
            },
            enddate:{
                type:String,
                optional:1
            }
        },
        "data":String,
        user:1,
        handle:poll.runListCount
    },//gql add
    {
        "method":"POST",
        "path":"/poll/run",
        "param": {
            poll:{
                type:String,
            },
            operator:String
        },
        "data":String,
        user:1,
        handle:poll.run
    },//gql add
    {
        "method":"GET",
        "path":"/poll/runinfo",
        "param": {
            id:{
                type:String,
            }
        },
        "data":String,
        handle:poll.runInfo
    },//gql add
    {
        "method":"GET",
        "path":"/poll/runinfo2",
        "param": {
            id:{
                type:String,
            }
        },
        "data":String,
        handle:poll.runInfo2
    },//gql add
    {
        "method":"GET",
        "path":"/poll/runinfotests",
        "param": {
            id:{
                type:String,
            },
			page:Number,
        },
        "data":String,
        handle:poll.runInfoTests
    },//gql add
    
    {
        "method":"POST",
        "path":"/poll/saveruninfo",
        "param": {
            id:{
                type:String,
            },
            reason:Number,
            other:{
                type:String,
                optional:1
            },
            recorder:String
        },
        "data":String,
        handle:poll.pollRunInfo
    },//gql add

    {
        "method":"GET",
        "path":"/poll/runstatistics",
        "param": {
            startdate:String,
            enddate:String,
			poll:{
                type:String,
                optional:1
            },
        },
        "data":String,
        handle:poll.runStatistics
    },//gql add
];

module.exports=interface;