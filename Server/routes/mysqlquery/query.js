

var e=require("../../util/error.json");
var fs=require("fs");
var uuid=require("uuid/v1");

function  Query() {
    
    this.query=async (req,res)=> {
        try
        {
            
            let query={
                //_id:req.clientParam.id
            }
            
            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            //console.log(err);
            util.catch(res,err);
        }
    } //gql add
    
}

module.exports=Query;