/**
 * Created by gql on 2018/12/5.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    poll:{
        type:mongoose.Schema.ObjectId,
        ref:"Poll"
    },
    pollName:{
        type:String,
        default:""
    },
    status:Number,  //0-unkown,2-success, 3-fail, 99-运行中
    testProject:{
        type:mongoose.Schema.ObjectId,
        ref:"TestProject"
    },
    projectName:{
        type:String,
        default:""
    },
    testCollection:{
        type:mongoose.Schema.ObjectId,
        ref:"TestCollection"
    },
    collectionName:{
        type:String,
        default:""
    },

    operator:{
        type:String,
        default:"system"
    },

    runTotal:Number,
    runException:Number,
    testTotal:Number,
    testFail:Number,
    testSuccess:Number,
    testUnkown:Number,
    tests:Array
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
var dbManage=db.model("PollRun",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

