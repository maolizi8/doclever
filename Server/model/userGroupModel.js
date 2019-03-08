/**
 * Created by gql on 2019/2/18.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    name:String,
    dis:{
        type:String,
        default:""
    },
    users:{
        type:[{
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User"
            },
            role:Number   // 0 管理员  1 普通成员 2 拥有者
        }],
        default:[]
    }
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
var dbManage=db.model("UserGroup",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;