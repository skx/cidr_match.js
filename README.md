cidr_match
----------

This is a simple `node.js` module for determining whether an IPv4 address
occurs within a given CIDR range.


Installation
------------

You should be able to install this module by executing:

    $ npm install cidr_match

Failing that you can clone the repository, and load the code via:

    require( "./cidr_match" );


Examples
--------

     //
     // Use the node.js assert module to validate our code.
     //
     var c      = require( "cidr_match" );
     var assert = require('assert');

     //
     // Does an IP come from within the given range?
     //
     assert(c.cidr_match ("10.0.0.24", "10.0.0.0/24" ) );
     assert(c.cidr_match ("10.0.0.240", "10.0.0.0/24" ) );
     assert(c.cidr_match ("10.0.0.240", "10.0/16" ) );


Notes
-----

We only consider IPv4 addresses, by desgin.

This code was abstracted from the [blogspam.js](https://github.com/skx/blogspam.js) repository.


License
-------

Please consider this licensed under the two-clause BSD license, included in the
file [LICENSE](LICENSE).


Steve
---