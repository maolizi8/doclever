/**
 * Created by gql on 2019/06/19.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    domain:String,
    host:String,
    platform:{
        type:String,
        default:''
    },
    is_delete:{
        type:Number,
        default:0
    },//0-否，1-是
    creator:String,
    updator:String,
},{
    timestamps:true
});

model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);

model.index({"domain":1});

var dbManage=db.model("DomainHost",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;