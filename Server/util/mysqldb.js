/**
 * Created by gql on 2019-04-02.
 */
//var queryLog=require("../model/sqlQueyLogModel")

var mysql = require('mysql');

// let mysqldb = function( connectinfo,sql, obj ) {

//     var pool = mysql.createPool(connectinfo)

//     // 返回一个 Promise
//     return new Promise(( resolve, reject ) => {
//         pool.getConnection(function(err, connection) {
//             if (err) {
//                 reject( err.stack )
//             } else {
//                 connection.query(sql, obj, ( err, rows) => {
//                     console.log("in   connection.query   1");
//                     //pool.releaseConnection(connection);
                   
//                     if ( err ) {
//                         reject( err.message )
//                     } else {
//                         resolve( rows )
//                     }
//                     // 结束会话
//                    connection.release();
//                     console.log("in   connection.query   2");
//                    //pool.releaseConnection(connection);
                   
//                 });
//             }
//             console.log("in  pool.getConnection");
//             //pool.releaseConnection(connection);

//         })
//     })
//   }
  
var mysqldb = function (connectinfo, sql, callback) {

    // var pool = mysql.createConnection({
    //     host: host,
    //     port: port,
    //     user: user,
    //     password: password,
    //     database:database
    // })
    var pool = mysql.createPool(connectinfo)
         
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, results) {
                if(err){
                    reject(err)
                }else{
                    //console.log(results);
                    //resolve(JSON.parse(JSON.stringify(results)))
                    resolve( results )
                }
                connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
            })
        })
    })
        
}
  


  module.exports =  mysqldb