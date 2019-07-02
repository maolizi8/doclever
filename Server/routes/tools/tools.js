/**
 * Created by gql 2019-03-29
 */

var e=require("../../util/error.json");
var util=require("../../util/util");
var mysql = require('mysql');

var queryLog=require("../../model/sqlQueyLogModel")
var domainHost=require("../../model/domainHostModel")

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

    this.getLocalHostIp=async (req,res)=> {
        try
        {
            const readline = require('readline');
            const fs = require('fs')
            var filepath='C:\\Windows\\System32\\drivers\\etc\\hosts'

            //var obj = fs.readFileSync(filepath, 'utf8');
            // console.log(obj);

            var obj={};
            let fileData = fs.createReadStream(filepath)
            const rl = readline.createInterface({
                input: fileData
            });
            rl.on('line', (line) => {
                console.log(`Line from file: ${line}`);
                if (line) {
                    if (line[0]!='#') {
                        line.replace('\t',' ')
                        var lineList=line.split(' ')
                        console.log(lineList)
                        obj[lineList[1]]=lineList[0]
                        console.log(obj)
                    }
                }
            });
            rl.on('close', (line) => {
                console.log("读取完毕！");
            });

            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            console.log("tools>getLocalHostIp: ");
            console.log(err)
            util.catch(res,err);
        }
        
    }


    this.getDomainHostList=async (req,res)=> {
        try
        {
            let obj=await (domainHost.findAsync({},"domain host platform"))

            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            console.log("tools>getDomainHostList: ");
            console.log(err)
            util.catch(res,err);
        }
        
    }

    this.getDomainHostIP=async (req,res)=> {
        try
        {
            let obj=await (domainHost.findOneAsync({
                domain:req.clientParam.domain,
                is_delete:0
            }))

            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            console.log("tools>getDomainHostIP: ");
            console.log(err)
            util.catch(res,err);
        }
        
    }
    this.saveDomainHost=async (req,res)=> {
        try
        {
            let obj;
            let update={
                domain:req.clientParam.domain,
                host:req.clientParam.host,
                platform:req.clientParam.platform,
                is_delete:0
            }

            if(req.clientParam.id)
            {
                update.updator=req.userInfo.name;
                obj=await (domainHost.findOneAndUpdateAsync({
                    _id:req.clientParam.id
                },update,{
                    new:true
                }));
            }
            else
            {
                update.creator=req.userInfo.name;
                let duplicat=await (domainHost.findOneAsync({
                    domain:req.clientParam.domain,
                    is_delete:0
                }));
                if (duplicat) {
                    util.throw(e.duplicateName,"不可添加重复的域名Host！");
                } else {
                    obj=await (domainHost.createAsync(update));
                }
                
            }

            util.ok(res,obj,"ok");
        }
        catch (err)
        {   
            console.log("tools>saveDomainHost: ");
            console.log(err)
            util.catch(res,err);
        }
        
    }

    this.removeDomainHost=async (req,res)=> {
        try
        {
            await (domainHost.removeAsync({
                _id:req.clientParam.id
            }))

            util.ok(res,"ok");
        }
        catch (err)
        {   
            console.log("tools>removeDomainHost: ");
            console.log(err)
            util.catch(res,err);
        }
        
    }

    this.importDomainHost=async (req,res)=>{
        try
        {
            let obj;
            let dup=0;
            let success=0;
            let dup_arr=[]
            try
            {
                obj=JSON.parse(req.clientParam.json);
            }
            catch (err)
            {
                util.throw(e.systemReason,"json解析错误");
                return;
            }
            for (let key in obj) {
                // if (!item.domain) {
                //     util.throw(e.systemReason,"必须有domain值！");
                // }
                // if (!item.host) {
                //     util.throw(e.systemReason,"必须有host值！");
                // }
                let duplicat=await (domainHost.findOneAsync({
                    domain:key,
                    is_delete:0
                }));
                if (duplicat) {
                    dup+=1
                    dup_arr.push(key)
                } else {
                    await (domainHost.createAsync({
                        domain:key,
                        host:obj[key],
                        is_delete:0,
                        creator:req.userInfo.name
                    }));
                    success+=1
                }
            }
            if (dup>0) {
                util.ok(res,dup_arr,"导入成功"+success+"个！重复的"+dup+"个未导入！");
            } else {
                util.ok(res,'','全部导入成功');
            }
            
        }
        catch (err)
        {
            util.catch(res,err);
        }
    }
}

module.exports=Tools;
