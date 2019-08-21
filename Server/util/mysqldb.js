
var mysqldb = function (connectinfo, sql) {
    var mysql = require('mysql');

    var connection = mysql.createConnection(connectinfo)
    connection.connect();  
    return new Promise(( resolve, reject ) => {
      
            connection.query(sql, function(err, results) {
                //connection.destroy() // 释放连接资源
                connection.end(); // 释放连接资源
                if(err){
                    reject(err)
                }else{
                    //console.log(results);
                    //resolve(JSON.parse(JSON.stringify(results)))
                    resolve( results )
                }
               
            })
       
    })
        
}
  


  module.exports =  mysqldb