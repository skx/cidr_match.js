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
     //  Determine whether the given IP falls within the specified
     // CIDR range.
     //
     function cidr_match( ip, range ) {

         //
         //  If the range doesn't have a slash it will only match if identical to the IP.
         //
         if ( range.indexOf( "/" ) < 0 )
         {
             return ( ip == range );
         }

         //
         //  Split the range by the slash
         //
         var parsed = range.split( "/" );
         if ( parsed.length != 2 )
         {
             console.log( "Failed to match CIDR-range on '/'" );
             return false;
         }


         //
         //  Pad out the base until it is four-parts long
         //
         //  e.g. This allows 10.0/16 to be the same as 10.0.0.0/16
         //
         while( parsed[0].split( "." ).length < 4 )
         {
             parsed[0] += ".0";
         }

         //
         //  The number of IPs in the range.
         //
         //  e.g. /24 == 256 IPs.
         //
         var ips = 0;

         //
         //  Work out how many IPs the /slash-part matches.
         //
         //  We run 2^(32-slash)
         //
         //
         ips = 32 - parseInt(parsed[1],10);
         ips = Math.pow( 2, ips)

         //
         // Logging
         //
         // console.log( "Range: " + range + " became " + parsed[0] + "'/'" + parsed[1] );
         // console.log( "Which covers " + ips + " ips");

         //
         // OK so we convert the starting IP to a long, and then calculate an ending-IP
         // by adding on the number of IPs the slash covers.
         //
         var ip_start = ip2long( parsed[0] );
         var ip_end   = ip_start + ips;

         //
         //  Now convert the IP we're testing to a long.
         //
         var ip_long = ip2long( ip );

         //
         // Is it within the range?  If so we've a match.
         //
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