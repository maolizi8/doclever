/**
 * Created by sunxin on 2017/5/19.
 * 
 * 后台定时任务功能？？？？
 */
var schedule = require("node-schedule");
;
;
var moment=require("moment");
var fs=require("fs");
var temp=require("../model/tempModel");
var poll=require("../model/pollModel");
var test=require("../model/testModel");
var user=require("../model/userModel");
var info=require("../model/infoModel");
var con=require("../../config.json");
var util=require("../util/util");
var blue=require("bluebird");


var switchSchedule;
if (con.scheduleJobSwitch!==undefined) {
    switchSchedule=con.scheduleJobSwitch;
} else {
    switchSchedule=true;
}

console.log("event.js>scheduleJob is open? "+switchSchedule)

if (switchSchedule) {
    var path = require('path');
    var rule = new schedule.RecurrenceRule();
    rule.minute = 30;
    blue.promisifyAll(fs);
    var tempJob = schedule.scheduleJob(rule,async function(){
        try
        {
            console.log("event.js>scheduleJob>>tempJob>>temp")
            let arr=await (temp.findAsync());
            for(let obj of arr)
            {
                let newDate=moment(obj.createdAt).add(30,"m");
                if(moment().isAfter(newDate))
                {
                    let pathName=path.join(con.filePath,"temp",obj.name+".zip");
                    console.log("event.js>scheduleJob>>tempJob>>pathName")
                    console.log(pathName);

                    if(await (fs.existsAsync(pathName)))
                    {
                        await (fs.unlinkAsync(pathName));
                    }
                    await (obj.removeAsync());
                }
            }
        }
        catch (err)
        {
            console.log("event.js>scheduleJob>>tempJob>>err")
            console.log(err);
        }
    
    });
    
    schedule.scheduleJob("0 0 0 * * *",(async function () {
        try
        {
            console.log("event.js>scheduleJob>>util.createStatistic")
            await (util.createStatistic());
        }
        catch (err)
        {
            console.log("event.js>scheduleJob>>createStatistic>>err")
            console.log(err);
        }
    }));

    schedule.scheduleJob("0 0 10 * * *",(async function () {
        try
        {
            console.log("event.js>scheduleJob>>util.removeOldData")
            
            await (util.removeOldData());
        }
        catch (err)
        {
            console.log("event.js>scheduleJob>>removeOldData>>err")
            console.log(err);
        }
    }));

    var runPollJob=schedule.scheduleJob("0 0 * * * *",(async function () {
        try
        {
            console.log('event.js>scheduleJob>>runPollJob>util.runPollBackend')
            let date=moment();
            //let weekDay=date.weekday()-1;
            let weekDay=date.isoWeekday()-1;
            let hour=date.hour();

            console.log('weekDay: '+weekDay)

            let arr=await (poll.findAsync({
                date:weekDay,
                time:hour,
                enabled:1
            },null));
    
            await (util.runPollBackend(arr,'system'));
    
            let objInfo=await (info.findOneAsync());
            
            if(objInfo.db.hours.indexOf(hour)>-1)
            {
                await (util.backup(objInfo.db,objInfo.version))
            }
        }
        catch (err)
        {
            console.log("event.js>scheduleJob>>runPollJob>>err")
            console.log(err);
        }
    }));

    var runPollJob2=schedule.scheduleJob("0 30 * * * *",(async function () {
        try
            {
                console.log('event.js>scheduleJob>>runPollJob2>util.runPollBackend')
                let date=moment();
                //let weekDay=date.weekday()-1;
                let weekDay=date.isoWeekday()-1;
                let hour=date.hour();
    
                console.log('weekDay: '+weekDay)
    
                let arr=await (poll.findAsync({
                    date:weekDay,
                    time2:hour,
                    enabled:1
                },null));
                // console.log('halfhour poll:')
                // console.log(arr)
        
                await (util.runPollBackend(arr,'system'));
        
                let objInfo=await (info.findOneAsync());
                
                if(objInfo.db.hours.indexOf(hour)>-1)
                {
                    await (util.backup(objInfo.db,objInfo.version))
                }
            }
            catch (err)
            {
                console.log("event.js>scheduleJob>>runPollJob2>>err")
                console.log(err);
            }
    }));
}

/**
moment().day() (0~6, 0: Sunday, 6: Saturday)
moment().weekday() (0~6, 0: Sunday, 6: Saturday)
moment().isoWeekday() (1~7, 1: Monday, 7: Sunday)
 */
// schedule.scheduleJob("0 45 * * * *",(async function () {
//     try
//     {
//         console.log("event.js>scheduleJob>>util.removeOldData")
        
//         await (util.removeOldData());
//     }
//     catch (err)
//     {
//         console.log("event.js>scheduleJob>>removeOldData>>err")
//         console.log(err);
//     }
// }));


// var test=schedule.scheduleJob("0 0 * * * *",(async function () {
//     try
//         {
//             console.log('event.js>scheduleJob>>test>util.runPollBackend')
            
//         }
//         catch (err)
//         {
//             console.log("event.js>scheduleJob>>test>>err")
//             console.log(err);
//         }
// }));





