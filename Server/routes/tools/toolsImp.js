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

    {
        "method":"GET",
        "path":"/tools/hostip",
        "param": {
            
        },
        "data":String,
        //user:1,
        handle:tools.getLocalHostIp
    },//gql add

    {
        "method":"GET",
        "path":"/tools/domainhostlist",
        "param": {
            
        },
        "data":String,
        //user:1,
        handle:tools.getDomainHostList
    },//gql add

    {
        "method":"GET",
        "path":"/tools/domainhostip",
        "param": {
            domain:String,
        },
        "data":String,
        //user:1,
        handle:tools.getDomainHostIP
    },//gql add

    {
        "method":"POST",
        "path":"/tools/savedomainhost",
        "param": {
            id:{
                type:String,
                optional:1
            },
            domain:String,
            host:String,
            platform:{
                type:String,
                optional:1
            },
        },
        "data":String,
        user:1,
        handle:tools.saveDomainHost
    },//gql add

    {
        "method":"DELETE",
        "path":"/tools/removedoaminhost",
        "param": {
            id:String,
        },
        "data":String,
        user:1,
        handle:tools.removeDomainHost
    },//gql add

    {
        "method":"POST",
        "path":"/tools/importdomainhost",
        "param": {
            json:{
                type:String
            }
        },
        "data":String,
        user:1,
        handle:tools.importDomainHost
    },
   
];

module.exports=interface;