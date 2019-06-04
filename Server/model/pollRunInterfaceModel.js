/**
 * Created by gql on 2018/12/5.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    pollRunTest:{
        type:mongoose.Schema.ObjectId,
        ref:"pollRunTest"
    },
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
    "status":-1,
    "createdAt":1})

var dbManage=db.model("pollRunInterface",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

