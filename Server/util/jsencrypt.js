
// function ae(L) {
//     var z;
//     var bW;
//     var t = "";
//     for (z = 0; z + 3 <= L.length; z += 3) {
//         bW = parseInt(L.substring(z, z + 3), 16);
//         t += a4.charAt(bW >> 6) + a4.charAt(bW & 63)
//     }
//     if (z + 1 == L.length) {
//         bW = parseInt(L.substring(z, z + 1), 16);
//         t += a4.charAt(bW << 2)
//     } else {
//         if (z + 2 == L.length) {
//             bW = parseInt(L.substring(z, z + 2), 16);
//             t += a4.charAt(bW >> 2) + a4.charAt((bW & 3) << 4)
//         }
//     }
//     while ((t.length & 3) > 0) {
//         t += J
//     }
//     return t
// }
// A.prototype.getPublicBaseKey = function () {
//     var L = {array: [new KJUR.asn1.DERObjectIdentifier({oid: "1.2.840.113549.1.1.1"}), new KJUR.asn1.DERNull()]};
//     var t = new KJUR.asn1.DERSequence(L);
//     L = {array: [new KJUR.asn1.DERInteger({bigint: this.n}), new KJUR.asn1.DERInteger({"int": this.e})]};
//     var bX = new KJUR.asn1.DERSequence(L);
//     L = {hex: "00" + bX.getEncodedHex()};
//     var bW = new KJUR.asn1.DERBitString(L);
//     L = {array: [t, bW]};
//     var z = new KJUR.asn1.DERSequence(L);
//     return z.getEncodedHex()
// };
// A.prototype.getPublicBaseKeyB64 = function () {
//     return ae(this.getPublicBaseKey())
// };
// A.prototype.wordwrap = function (L, t) {
//     t = t || 64;
//     if (!L) {
//         return L
//     }
//     var z = "(.{1," + t + "})( +|$\n?)|(.{1," + t + "})";
//     return L.match(RegExp(z, "g")).join("\n")
// };
// A.prototype.getPrivateKey = function () {
//     var t = "-----BEGIN RSA PRIVATE KEY-----\n";
//     t += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
//     t += "-----END RSA PRIVATE KEY-----";
//     return t
// };
// A.prototype.getPublicKey = function () {
//     var t = "-----BEGIN PUBLIC KEY-----\n";
//     t += this.wordwrap(this.getPublicBaseKeyB64()) + "\n";
//     t += "-----END PUBLIC KEY-----";
//     return t
// };


// function wordwrap(L, t) {
//     t = t || 64;
//     if (!L) {
//         return L
//     }
//     var z = "(.{1," + t + "})( +|$\n?)|(.{1," + t + "})";
//     return L.match(RegExp(z, "g")).join("\n")
// };
// var a4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// var J = "=";
// function ae(L) {
//     var z;
//     var bW;
//     var t = "";
//     for (z = 0; z + 3 <= L.length; z += 3) {
//         bW = parseInt(L.substring(z, z + 3), 16);
//         t += a4.charAt(bW >> 6) + a4.charAt(bW & 63)
//     }
//     if (z + 1 == L.length) {
//         bW = parseInt(L.substring(z, z + 1), 16);
//         t += a4.charAt(bW << 2)
//     } else {
//         if (z + 2 == L.length) {
//             bW = parseInt(L.substring(z, z + 2), 16);
//             t += a4.charAt(bW >> 2) + a4.charAt((bW & 3) << 4)
//         }
//     }
//     while ((t.length & 3) > 0) {
//         t += J
//     }
//     return t
// }
// var getPublicKey = function(key){
    
//     var t = "-----BEGIN PUBLIC KEY-----\n";
//     t += wordwrap(ae(key)) + "\n";
//     t += "-----END PUBLIC KEY-----";
//     return t

//     //var result = insert_str(key, '\n', 64);
//     //return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
// };



// function insert_str(str, insert_str, sn) {
//     var newstr = "";
//     for (var i = 0; i < str.length; i += sn) {
//         var tmp = str.substring(i, i + sn);
//         newstr += tmp + insert_str;
//     }
//     return newstr;
// }
// var getPublicKey = function(key){
//     var result = insert_str(key, '\n', 64);
//     return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
// };