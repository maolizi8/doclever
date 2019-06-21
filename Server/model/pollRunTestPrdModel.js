/**
 * Created by gql on 2019/06/18.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    pollRun:{
        type:mongoose.Schema.ObjectId,
        ref:"PollRunPrd"
    },
    // testId:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"Test"
    // },
    runEnvironment:{
        type:Number,
        default:1
    },//gql add,0-测试环境，1-生产环境
    
    testId:String,
    testName:{
        type:String,
        default:""
    },
    testGroup:{
        type:String,
        default:""
    },
    testModule:{
        type:String,
        default:""
    },
    status:{
        type:Number,
        default:0       //0-unkown,1-success, 2-fail, 99-运行中
    },
    mode:String,
    testOrder:Number,
    output:{
        type:String,
        default:""
    },
    interfaces:Array
    
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);

model.index({
    "pollRun":-1
});
model.index({
    "createdAt":1
});

model.index({
    "pollRun":-1,
    "status":-1,
    "createdAt":1
});

var dbManage=db.model("PollRunTestPrd",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

