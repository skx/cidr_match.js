(function ()
 {

     function ip2long( a, b, c, d ) {
         for (
             c = b = 0;
             d = a.split('.')[b++];
             c +=
             d >> 8
                 |
                 b > 4 ?
                 NaN
                 :
                 d * (1 << -8 * b)
         )
             d = parseInt(
                     +d
                     &&
                     d
             );
         return c
     }


     //
     //  Convert a long integer to an IP address.
     //
     function long2ip(i) {
         return(
         1 << -1 <= i
             &&
         i < 4294967296
             &&
         [
             i >>> 24, // calculate the first octet
             255 & i >>> 16, // calculate the second octet
             255 & i >>> 8, // calculate the third octet
             255 & i // calculate the fourth octet
         ].join('.')) // combine the octets into dot-decimal notation
     }

     //
     //  Naive CIDR-matching.
     //
     function cidr_match( ip, range ) {

         console.log( "Looking for " + ip + " in " + range );
         //
         //  The CIDR regexp.
         //
         var cidr = /^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\/([0-9]+)$/;


         //
         // Is the IP value a CIDR range?
         //
         var cidr_match = cidr.exec( range );
         if ( cidr_match )
         {
             //
             // We work out how many wildcard bits there are.
             //
             // And how many IPs that range matches.  The biggest
             // range we care about is a /24, because we're naive.
             //
             var slash = cidr_match[5];
             var count = 256;

             switch(slash){
                 //
                 // People can/will/do submit 192.168.0.0/255
                 // because they don't understand how CIDR works.
                 //
             case "255":
                 count = 256; break;

             case "24":
                 count = 256; break;
             case "25":
                 count = 128; break;
             case "26":
                 count = 64; break;
             case "27":
                 count = 32; break;
             case "28":
                 count = 16; break;
             case "29":
                 count = 8; break;
             case "30":
                 count = 4; break;
             case "31":
                 count = 2; break;
             case "32":
                 count = 1; break;
             default:
                 console.log( "CIDR - failed to match  " + range );
                 count = 0; break;
             };
             //
             // We setup a loop to iterate.
             //
             var match = false;
             for ( var i = 0; i < count ; i++ )
             {
                 //
                 //  Build up the IP from 1.2.3.(4+i)
                 //
                 var tmp = cidr_match[1] + "." +
                     cidr_match[2] + "." +
                     cidr_match[3] + "." +
                     ( parseInt(cidr_match[4],10) + parseInt(i,10) );

                 //
                 //  Does it match the submitters IP?
                 //
                 if ( tmp == ip ) {
                     return true;
                 }
             }

         }

         return false;
     };


     //
     // Export our public API
     //
     var exports = {};
     exports.cidr_match = cidr_match;
     exports.long2ip    = long2ip;
     exports.ip2long    = ip2long;

     module.exports = exports;
}());