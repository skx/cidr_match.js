(function ()
 {
     //
     // Convert an IP to a long integer.
     //
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
     //  CIDR-matching.
     //
     function cidr_match( ip, range ) {

         //
         // 1.  Log.
         //
         console.log( "Looking for " + ip + " in " + range );



         //
         //  If the range doesn't have a slash it
         // will only match if identical to the IP.
         //
         if ( range.indexOf( "/" ) < 0 )
         {
             return ( ip == range );
         }

         //
         //  Split the range by the slash
         //
         var parsed = range.split( "/" );

         //
         //  Pad out the base until it is four-parts long
         while( parsed[0].split( "." ).length < 4 )
         {
             parsed[0] += ".0";
         }

         var ips = 0;

         switch(parsed[1]) {
         case "16":
             ips = 65536; break;
         case "17":
             ips = 32768; break;
         case "18":
             ips = 16385; break;
         case "19":
             ips = 8192; break;
         case "20":
             ips = 4096; break;
         case "21":
             ips = 2048; break;
         case "22":
             ips = 1024; break;
         case "23":
             ips = 256; break;
         case "24":
             ips = 256; break;
         case "25":
             ips = 128; break;
         case "26":
             ips = 64; break;
         case "27":
             ips = 32; break;
         case "28":
             ips = 16; break;
         case "29":
             ips = 8; break;
         case "30":
             ips = 4; break;
         case "31":
             ips = 2; break;
         case "32":
             count = 1; break;
         default:
             console.log( "CIDR - failed to match  " + range );
             ips = 0; break;
         };

         //
         // Work out how many wildcard bits there are.
         //
         console.log( "Range: " + range + " became " + parsed[0] + ":" + parsed[1] );
         console.log( "Which covers " + ips + " ips");

         //
         // OK so we convert the starting IP to a long, and then calculate an ending-IP
         //
         var ip_start = ip2long( parsed[0] );
         var ip_end   = ip_start + ips;

         //
         //  Now convert the IP we're testing
         //
         var ip_long = ip2long( ip );

         if ( ( ip_long <= ip_end ) && ( ip_long >= ip_start ) )
         {
             return true;
         }
         else
         {
             return false;
         }
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