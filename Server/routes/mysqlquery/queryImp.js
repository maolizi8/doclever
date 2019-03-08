/**
 * Created by sunxin on 2017/7/5.
 */
var queryClass=require("./query");
var query=new queryClass();
var interface=[
    {
        "method":"POST",
        "path":"/query/query",
        "param": {
            id:{
                type:String,
            }
        },
        "data":String,
        handle:query.query
    },//gql add
];

module.exports=interface;