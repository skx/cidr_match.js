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
