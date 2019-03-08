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