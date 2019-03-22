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
    status:{
        type:Number,  //0-unkown,2-success, 3-fail, 99-运行中
        default:0
    },
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
    tests:Array,
    failReason:{
        type:Object,
        default:{}  // reason:1-接口变更、2-应用异常有bug、3-测试环境异常、4-应用部署导致、5-用例问题，99-其他
    }
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
model.index({"createdAt":-1})
var dbManage=db.model("PollRun",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

