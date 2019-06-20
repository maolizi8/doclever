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
    pollRunTest:{
        type:mongoose.Schema.ObjectId,
        ref:"pollRunTest"
    },

    runEnvironment:{
        type:Number,
        default:0
    },//gql add,0-测试环境，1-生产环境

    // interId: {
    //     type:String,
    //     default:""
    // },
    interId: {
        type:mongoose.Schema.ObjectId,
        ref:"Interface"
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
    status:{
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
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);

model.index({
    "createdAt":1
});
model.index({
    "pollRunTest":1
});

model.index({
    "createdAt":1,
    "pollRunTest":1
});

var dbManage=db.model("pollRunInterface",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

