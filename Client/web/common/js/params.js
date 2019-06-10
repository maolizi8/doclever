function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

function getUrlParam (name, url = window.location.search){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    var strValue = "";
    if (r != null) {
        strValue = unescape(r[2]);
    }
    return strValue;
}



function yyyRsaEncrypt(data) {
    if (null == data || data.length == 0){

    }else {
        var rsa = new JSEncrypt();
        rsa.setPublicKey(rsapublickey);
        var rsadata = rsa.encrypt(data);
        return rsadata;
    }
}


function queryMySql(host,user,password,port,database,sql) {
    console.log("param.js>queryMySql: ")
    console.log(session.get("id"))
}
//format the date string from webservice to UTC time;
function toUTCtime(dateStr) {
    //Date(1381243615503+0530),1381243615503,(1381243615503+0800)
     
    dateStr += "";
    var utcPrefix = 0;
    var offset = 0;
    var dateFormatString = "yyyy-MM-dd hh:mm:ss";
    var utcTimeString = "";
    var totalMiliseconds = 0;

    var regMatchNums = /\d+/gi;
    var regSign = /[\+|\-]/gi;
    var arrNums = dateStr.match(regMatchNums);
    utcPrefix = parseInt(arrNums[0]);
    if (arrNums.length > 1) {
        offset = arrNums[1];
        offsetHour = offset.substring(0, 2);
        offsetMin = offset.substring(2, 4);
        offset = parseInt(offsetHour) * 60 * 60 * 1000 + parseInt(offsetMin) * 60 * 1000;
    }
    if(dateStr.lastIndexOf("+")>-1){
        totalMiliseconds= utcPrefix - offset;
    } else if (dateStr.lastIndexOf("-") > -1) {
        totalMiliseconds = utcPrefix + offset;
    }

    utcTimeString = new Date(totalMiliseconds).format(dateFormatString);
    return utcTimeString;
}

Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}        

function  getExplorer() {  
    var explorer = window.navigator.userAgent ;  
    //ie  
    if (explorer.indexOf("MSIE") >= 0) {  
        return 'ie';  
    }  
    //firefox  
    else if (explorer.indexOf("Firefox") >= 0) {  
        return 'Firefox';  
    }  
    //Chrome  
    else if(explorer.indexOf("Chrome") >= 0){  
        return 'Chrome';  
    }  
    //Opera  
    else if(explorer.indexOf("Opera") >= 0){  
        return 'Opera';  
    }  
    //Safari  
    else if(explorer.indexOf("Safari") >= 0){  
        return 'Safari';  
    }  
}  

function getLocalDate(shijianchuo){
    var instance =new Date(shijianchuo); //创建一个Date对象
    var localTime = instance.getTime();
    var localOffset=instance.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
    var utc = localTime + localOffset; //utc即GMT时间
    var offset =8; //东8区
    var beijing = utc + (3600000*offset);
    return new Date(beijing);
}

//格式化utc时间
function convertUtcTimeToLocalTime(utc_time, utc_offset){
    if(utc_time == ''){
           return '';
    }
    //e.g. Param: utc_time = "2011-09-22T09:13:07.0"; lag = +8;
    //return 2011年9月22日 17:13:07
    var utcdate= new Date(Date.parse(utc_time.substr(0,utc_time.indexOf(".")).replace("T", " ").replace(/-/g, "/")));
    if(utcdate == "NaN" || utcdate == "Invalid Date"){
       return utc_time;
    }
    var localdate = new Date(utcdate.getTime() + utc_offset*3600000);
    return localdate.getFullYear()+"年"+(localdate.getMonth()+1)+"月"+localdate.getDate()+"日 "+(localdate.getHours()<10?"0"+localdate.getHours():localdate.getHours())+":"+(localdate.getMinutes()<10 ? "0"+localdate.getMinutes():localdate.getMinutes())+":"+(localdate.getSeconds()<10 ? "0"+localdate.getSeconds():localdate.getSeconds());
   }
