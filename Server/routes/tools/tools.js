/**
 * Created by gql 2019-03-29
 */

var e=require("../../util/error.json");
var util=require("../../util/util");
var mysql = require('mysql');

var queryLog=require("../../model/sqlQueyLogModel")

function Tools() {
    
    this.queryMysql=async (req,res)=> {
        try
        {
            console.log("req.userInfo>>")
            console.log(req.userInfo)
            var host=req.clientParam.host;      
            var user=req.clientParam.user;              
            var password=req.clientParam.password;        
            var port=req.clientParam.port;                      
            var database=req.clientParam.database;
            var sql=req.clientParam.sql;
            var operator=req.userInfo?req.userInfo.name:"system"
            let obj=await (util.handleMysql(host,user,password,port,database,sql,operator));
           
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            console.log("tools>queryMySql: ");
            console.log(err)
            util.catch(res,err);
        }
    }//gql add
}

module.exports=Tools;
