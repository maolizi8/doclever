var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    recievUsers:{
        type:[String],
        default:[]
    },
    weekday:{
        type:[Number],
        default:[]
    },
    hour:{
        type:[Number],
        default:[]
    },  
    hour2:{
        type:[Number],
        default:[]
    },  // for half of hour
},{
    timestamps:true
});

var dbManage=db.model("pollFigureInterRun",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;