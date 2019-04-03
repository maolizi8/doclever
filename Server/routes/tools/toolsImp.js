/**
 * Created by gql 2019-03-29
 */

var toolsClass=require("./tools");
var tools=new toolsClass();

var interface=[
    
    {
        "method":"POST",
        "path":"/tools/querymysql",
        "param": {
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
                optional:1
            },
        },
        "data":String,
        //user:1,
        handle:tools.queryMysql
    },//gql add
   
];

module.exports=interface;