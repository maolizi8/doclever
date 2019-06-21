/**
 * Created by sunxin on 2016/11/8.
 */
var mongoose = require('mongoose');
var mongoomise=require("mongoomise")
var db=require("../util/db.js");
var model=new mongoose.Schema({
    name:String,
    password:String,

    role:{
        type:Number,    //0-系统管理员， 1-测试管理员，2-测试人员, 11-开发管理员，12-开发人员， 99-普通用户
        default:99
    },
    prdRole:{
        type:Number,    
        default:0   //线上环境调试的权限： 0-无， 1-有。 role为0或2
    },

    sex:String,
    age:Number,
    company:String,
    photo:String,
    phone:String,
    state:{
        type:Number,
        default:1
    },
    qq:String,
    email:String,
    loginCount:{
        type:Number,
        default:0
    },
    lastLoginDate:Date,
    question:String,
    answer:String,
    qqId:String,
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
    }
},{
    timestamps:true
});
model.configOutputField(null,[
    "createdAt",
    "updatedAt",
    "lastLoginDate"
]);
var dbManage=db.model("User",model);
mongoomise.promisifyAll(dbManage,require("bluebird"));
module.exports=dbManage;