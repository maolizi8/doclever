/**
 * Created by gql on 2018/12/5.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    pollRun:{
        type:mongoose.Schema.ObjectId,
        ref:"PollRun"
    },
    // testId:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"Test"
    // },
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
    interfaces:{
        type:[
            {
                // interId: {
                //     type:mongoose.Schema.ObjectId,
                //     ref:"Interface"
                // },
                interId: {
                    type:String,
                    default:""
                },
                interName :{
                    type:String,
                    default:""
                },
                interBaseUrl:{
                    type:String,
                    default:""
                },
                interPath:{
                    type:String,
                    default:""
                },
                runTime:{
                    type:String,
                    default:""
                },
                errMessage:{
                    type:String,
                    default:""
                },
                request:{
                    type:{
                        url:{
                            type:String,
                            default:""
                        },
                        method:{
                            type:String,
                            default:""
                        },
                        headers:{
                            type:String,
                            default:""
                        },
                        bodyType:{
                            type:Number,
                            default:0
                        },
                        rawType:{
                            type:String,
                            default:0
                        },
                        form:{
                            type:String,
                            default:""
                        },
                        body:{
                            type:String,
                            default:""
                        }
                    },
                    default:{}
                },
                result:{
                    type:{
                        headers:{
                            type:String,
                            default:""
                        },
                        status:{
                            type:String,
                            default:""
                        },
                        bodytype:{
                            type:String,
                            default:""
                        },
                        data:{
                            type:String,
                            default:""
                        }
                    },
                    default:{}
                }
            }
        ],
        default:[]
    }
    
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
model.index({
    "status":-1,
    "createdAt":1})

var dbManage=db.model("pollRunTest",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

