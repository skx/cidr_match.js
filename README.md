cidr_match
----------

This is a simple `node.js` module for determining whether a given IPv4 address
occurs within a given CIDR mask.

We only consider IPv4 addresses, by desgin.


Example
-------

     //
     //  Require our code.
     //
     var c = require( "cidr_match" );

     //
     // Does it match?
     //
     if ( c.cidr_match ("10.0.0.24", "10.0.0.0/24" ) )
     {
         console.log( "Success" );
     }


Steve
---