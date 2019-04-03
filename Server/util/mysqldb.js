/**
 * Created by gql on 2019-04-02.
 */
var mysql = require('mysql');
var queryLog=require("../model/sqlQueyLogModel")


let mysqldb = function( connectinfo,sql, obj ) {

    var pool = mysql.createPool(connectinfo)
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err.stack )
            } else {
                
                connection.query(sql, obj, ( err, rows) => {
                    console.log("mysqldb>obj:")
                    console.log(obj)
                    
                    if ( err ) {
                        reject( err.message )
                    } else {
                        
                        resolve( rows )
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
  }
  
  module.exports =  mysqldb