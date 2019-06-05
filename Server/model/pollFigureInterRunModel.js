var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    enabled:{
        type:Number,
        default:1   //0-关闭，1-开启
    },
    reciveUsers:{
        type:String,
        default:''
    },
    weekday:{
        type:[Number],
        default:[]
    },
    hour:Number,  
    minute:{
        type:Number,
        default:0
    }, 
    updator:{
        type:String,
        default:''
    }
},{
    timestamps:true
});

var dbManage=db.model("pollFigureInterRun",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;