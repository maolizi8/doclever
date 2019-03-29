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
            var update={
                host     : req.clientParam.host,       
                user     : req.clientParam.user,               
                password : req.clientParam.password,        
                port: req.clientParam.port,                      
                database: req.clientParam.database
            }

            var connection = mysql.createConnection({     
                host     : req.clientParam.host,       
                user     : req.clientParam.user,               
                password : req.clientParam.password,        
                port: req.clientParam.port,                      
                database: req.clientParam.database 
            }); 
               
            connection.connect(function(err) {
                if (err) {
                    util.throw(e.systemReason,err.stack);
                }
                console.log('connected as id ' + connection.threadId);
            });
            
            var  sql = req.clientParam.sql;
            var n=(sql.split(';')).length-1;
            if (n>1) {
                util.throw(e.systemReason,"暂不支持多语句查询");
            }
            var dangerStr=["delete *","DELETE *","TRUNCATE","truncate","drop"]
            for (let s of dangerStr) {
                if (sql.indexOf(s)>-1) {
                    util.throw(e.systemReason,"含有危险操作");
                    break;
                }
            }
            var obj={}
            if (sql.indexOf("select")==0 || sql.indexOf("SELECT")==0 ) {
                obj.sqlType=1
            }else  if (sql.indexOf("delete")==0 || sql.indexOf("DELETE")==0 ) {
                obj.sqlType=2
            } else if (sql.indexOf("update")==0 || sql.indexOf("UPDATE")==0 ) {
                obj.sqlType=3
            } else if (sql.indexOf("insert")==0 || sql.indexOf("INSERT")==0 ) {
                obj.sqlType=4
            }
            

            

            connection.query(sql,function (err, result) {
                if(err){
                    util.throw(e.systemReason,err.message);
                }

                if (obj.sqlType==1) {
                    obj.data=result.data
                    update.data=result.data
                } else{
                    obj.data=result.affectedRows
                    update.affectedRows=result.affectedRows
                }

                update.sqlType=obj.sqlType
                //update.result=obj.data.toString()
                update.sql=req.clientParam.sql
                update.operator=req.clientParam.operator?req.clientParam.operator:"system"
                await (queryLog.createAsync(update));
            });
               
            connection.end();
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    }//gql add
}

module.exports=Tools;
