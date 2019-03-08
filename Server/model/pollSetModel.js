/**
 * Created by geqiuli on 2018/12/11.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    //name:String,
    sendInfo:{
        user:{
            type:String,
            default:""
        },
        password:{
            type:String,
            default:""
        },
        smtp:{
            type:String,
            default:""
        },
        port:{
            type:Number,
            default:465
        }
    },
    isDefault:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
var dbManage=db.model("PollSet",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;