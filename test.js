//
//  Require our code.
//
var c = require( "cidr_match" );

//
// Use the node.js assert module to validate our code.
//
var assert = require('assert');

//
// Does an IP come from within the given range?
//
assert(c.cidr_match ("10.0.0.24", "10.0.0.0/24" ) );
assert(c.cidr_match ("10.0.0.240", "10.0.0.0/24" ) );
assert(c.cidr_match ("10.0.0.240", "10.0/16" ) );

assert( ! ( c.cidr_match ("10.0.0.24", "10.0.1.0/24" )  ) );


//
// Test converting a series of IPs to long integers and back
//
a = [ "192.168.1.10", "10.22.33.44", "255.255.255.255", "0.0.0.0" ];

a.forEach(function (key){

    var ip_in   = key;
    var long_id = c.ip2long( ip_in )
    var ip_out  = c.long2ip( long_id );

    assert( ip_out === ip_in );
});
