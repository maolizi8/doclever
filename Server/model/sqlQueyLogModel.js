/**
 * Created by sunxin on 2017/7/5.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    
    host:String,
    user:{
        type:String,
    },
    password:{
        type:String,
    },
    port:{
        type:Number,
    },
    sql:String,
    database:String,
    operator:{
        type:String,
        default:"system"
    },
    sqlType:Number,
    data:Object,
    affectedRows:Number,
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt"
]);
var dbManage=db.model("SqlQueyLogModel",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;

